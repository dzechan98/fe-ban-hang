import { ConfirmDialog, Page, RouterLink } from "@components/core";
import { Avatar, Button, IconButton, Stack, Typography } from "@mui/material";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { Table } from "@components/core";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { capitalizeWords } from "@utils/capitalizeWords";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDisclosure } from "@hooks/useDisclosure";
import { ROUTES } from "@router/constants";
import { toast } from "react-toastify";
import { getError } from "@utils/getError";
import { useDeleteUser, useListUsers, UserResponse } from "@api/users";

const styleCenter = {
  display: "flex",
  alignItems: "center",
};

const getColumns = (
  onClickEdit: (id: string) => void,
  onClickDelete: (id: string) => void
) => {
  return [
    {
      headerName: "Tên tài khoản",
      minWidth: 250,
      wrapText: true,
      cellRenderer: ({ data }: ICellRendererParams<UserResponse>) =>
        data?.name && (
          <Typography variant="body2">{capitalizeWords(data.name)}</Typography>
        ),
      cellStyle: styleCenter,
    },
    {
      headerName: "Email",
      field: "email",
      flex: 1,
      wrapText: true,
      cellStyle: styleCenter,
    },
    {
      headerName: "Avatar",
      autoHeight: true,
      width: 120,
      cellRenderer: ({ data }: ICellRendererParams<UserResponse>) =>
        data && (
          <Stack alignItems="center" justifyContent="center" padding={1}>
            <Avatar src={data.image} alt={data.name} />
          </Stack>
        ),
      cellStyle: styleCenter,
    },
    {
      headerName: "Số điện thoại",
      field: "phone",
      cellStyle: styleCenter,
      flex: 1,
    },
    {
      headerName: "Actión",
      cellClass: "no-border",
      cellStyle: styleCenter,
      width: 140,
      suppressColumnsToolPanel: true,
      sortable: false,
      cellRenderer: ({ data }: ICellRendererParams<UserResponse>) =>
        data && (
          <Stack direction="row" gap={0.25}>
            <IconButton
              color="success"
              size="small"
              onClick={() => onClickEdit(data._id)}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              color="warning"
              size="small"
              onClick={() => onClickDelete(data._id)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Stack>
        ),
      resizable: false,
    },
  ] as ColDef<UserResponse>[];
};

export const UsersPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 5);

  const deleteDisclosure = useDisclosure({});

  const { data, isLoading, isFetching } = useListUsers({ page, limit });

  const [idUser, setIdUser] = useState("");
  const deleteUserMutation = useDeleteUser({
    queryKey: ["listUsers", page, limit],
  });

  const handleClickEdit = (id: string) => {
    navigate(`${ROUTES.users.root}/${id}`);
  };

  const handleClickDelete = (id: string) => {
    setIdUser(id);
    deleteDisclosure.onOpen();
  };

  const columnDefs = useMemo(
    () => getColumns(handleClickEdit, handleClickDelete),
    []
  );

  const handleConfirmDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(idUser);
      setIdUser("");
      deleteDisclosure.onClose();
      toast.success("Xóa tài khoản thành công");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleCloseDialog = () => {
    setIdUser("");
    deleteDisclosure.onClose();
  };

  const totalPage = useMemo(() => {
    if (data) {
      return Math.ceil(data?.count / limit);
    }
  }, [limit, data]);

  return (
    <Page title="Danh sách tài khoản">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Typography color="primary.main" fontSize="24px">
          Danh sách tài khoản
        </Typography>
        <RouterLink to="./new">
          <Button variant="outlined">Thêm tài khoản</Button>
        </RouterLink>
      </Stack>
      <Table
        rowData={data?.results ?? []}
        columnDefs={columnDefs}
        page={page}
        limit={limit}
        totalPage={totalPage}
        loading={isLoading || isFetching}
      />
      <ConfirmDialog
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa mục này không? Hành động này không thể hoàn tác."
        open={deleteDisclosure.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </Page>
  );
};
