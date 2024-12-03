import { ConfirmDialog, Page, RouterLink } from "@components/core";
import { Avatar, Button, IconButton, Stack, Typography } from "@mui/material";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { Table } from "@components/core";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { capitalizeWords } from "@utils/capitalizeWords";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDisclosure } from "@hooks/useDisclosure";
import { getError } from "@utils/getError";
import { useDeleteUser, useListUsers, UserResponse } from "@api/users";
import { useNotification } from "@hooks/useNotification";

const styleCenter = {
  display: "flex",
  alignItems: "center",
};

const getColumns = (onClickDelete: (id: string) => void) => {
  return [
    {
      headerName: "Tài khoản",
      minWidth: 250,
      wrapText: true,
      cellRenderer: ({ data }: ICellRendererParams<UserResponse>) =>
        data?.name && (
          <Typography variant="body2">{capitalizeWords(data.name)}</Typography>
        ),
      flex: 1,
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
      headerName: "Ảnh đại diện",
      autoHeight: true,
      cellRenderer: ({ data }: ICellRendererParams<UserResponse>) =>
        data && (
          <Stack alignItems="center" justifyContent="center" padding={1}>
            <Avatar src={data.image} alt={data.name} />
          </Stack>
        ),
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Giới tính",
      field: "gender",
      width: 120,
      cellStyle: styleCenter,
    },
    {
      headerName: "Số điện thoại",
      field: "phone",
      cellStyle: styleCenter,
      flex: 1,
    },
    {
      headerName: "Thao tác",
      cellClass: "no-border",
      cellStyle: styleCenter,
      suppressColumnsToolPanel: true,
      sortable: false,
      width: 120,
      cellRenderer: ({ data }: ICellRendererParams<UserResponse>) =>
        data && (
          <IconButton
            color="warning"
            size="small"
            onClick={() => onClickDelete(data._id)}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        ),
      resizable: false,
    },
  ] as ColDef<UserResponse>[];
};

export const UsersPage = () => {
  const { success, error: errorNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const deleteDisclosure = useDisclosure({});

  const { data, isLoading, isFetching } = useListUsers({ page, limit });

  const [idUser, setIdUser] = useState("");
  const deleteUserMutation = useDeleteUser({
    queryKey: ["listUsers", page, limit],
  });

  const handleClickDelete = (id: string) => {
    setIdUser(id);
    deleteDisclosure.onOpen();
  };

  const columnDefs = useMemo(() => getColumns(handleClickDelete), []);

  const handleConfirmDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(idUser);
      setIdUser("");
      deleteDisclosure.onClose();
      success("Xóa tài khoản thành công", {
        autoHideDuration: 3000,
      });
    } catch (error) {
      errorNotification(getError(error), { autoHideDuration: 3000 });
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
