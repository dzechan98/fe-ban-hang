import { ConfirmDialog, Page, RouterLink } from "@components/core";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { Table } from "@components/core";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { capitalizeWords } from "@utils/capitalizeWords";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDisclosure } from "@hooks/useDisclosure";
import { ROUTES } from "@router/constants";
import { getError } from "@utils/getError";
import {
  CategoryResponse,
  useDeleteCategory,
  useListCategories,
} from "@api/categories";
import { useNotification } from "@hooks/useNotification";

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
      headerName: "Danh mục",
      flex: 1,
      wrapText: true,
      valueGetter: ({ data }) => data && capitalizeWords(data.title),
      cellStyle: styleCenter,
    },
    {
      headerName: "Hình ảnh",
      autoHeight: true,
      flex: 1,
      cellRenderer: ({ data }: ICellRendererParams<CategoryResponse>) =>
        data && (
          <Stack alignItems="center" justifyContent="center" padding={1}>
            <Box
              component="img"
              src={data.image_url}
              alt={data.title}
              sx={{
                height: 40,
                borderRadius: "2px",
              }}
              loading="lazy"
            />
          </Stack>
        ),
    },
    {
      headerName: "Thao tác",
      cellClass: "no-border",
      cellStyle: styleCenter,
      width: 140,
      suppressColumnsToolPanel: true,
      sortable: false,
      cellRenderer: ({ data }: ICellRendererParams<CategoryResponse>) =>
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
  ] as ColDef<CategoryResponse>[];
};

export const CategoriesPage = () => {
  const { success, error: errorNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 8);

  const deleteCategoryDisclosure = useDisclosure({});

  const { data, isLoading, isFetching } = useListCategories({ page, limit });

  const [idCategory, setIdCategory] = useState("");
  const deleteCategoryMutation = useDeleteCategory({
    queryKey: ["listCategories", page, limit],
  });

  const handleClickEdit = (id: string) => {
    navigate(`${ROUTES.categories.root}/${id}`);
  };

  const handleClickDelete = (id: string) => {
    setIdCategory(id);
    deleteCategoryDisclosure.onOpen();
  };

  const columnDefs = useMemo(
    () => getColumns(handleClickEdit, handleClickDelete),
    []
  );

  const handleConfirmDelete = async () => {
    try {
      await deleteCategoryMutation.mutateAsync(idCategory);
      setIdCategory("");
      deleteCategoryDisclosure.onClose();
      success("Xóa danh mục thành công", { autoHideDuration: 3000 });
    } catch (error) {
      errorNotification(getError(error), { autoHideDuration: 3000 });
    }
  };

  const handleCloseDialog = () => {
    setIdCategory("");
    deleteCategoryDisclosure.onClose();
  };

  const totalPage = useMemo(() => {
    if (data) {
      return Math.ceil(data?.count / limit);
    }
  }, [limit, data]);

  return (
    <Page title="Danh sách danh mục">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Typography color="primary.main" fontSize="24px">
          Danh sách danh mục
        </Typography>
        <RouterLink to="./new">
          <Button variant="outlined">Thêm danh mục</Button>
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
        open={deleteCategoryDisclosure.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </Page>
  );
};
