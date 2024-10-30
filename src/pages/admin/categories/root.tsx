import { ConfirmDialog, Page, RouterLink } from "@components/core";
import { Button, IconButton, Stack, Typography } from "@mui/material";
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
import {
  CategoryResponse,
  useDeleteCategory,
  useListCategories,
} from "@api/categories";

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
      headerName: "Tên danh mục",
      flex: 1,
      wrapText: true,
      valueGetter: ({ data }) => data && capitalizeWords(data.title),
      cellStyle: styleCenter,
    },
    {
      headerName: "Slug",
      flex: 1,
      wrapText: true,
      valueGetter: ({ data }) => data && data.slug,
      cellStyle: styleCenter,
    },
    {
      headerName: "Thumbnail",
      autoHeight: true,
      flex: 1,
      cellRenderer: ({ data }: ICellRendererParams<CategoryResponse>) =>
        data && (
          <Stack alignItems="center" justifyContent="center" padding={1}>
            <img
              src={data.image_url}
              alt={data.title}
              style={{
                display: "block",
                height: 30,
                borderRadius: "2px",
              }}
              loading="lazy"
            />
          </Stack>
        ),
      cellStyle: styleCenter,
    },
    {
      headerName: "Actión",
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 5);

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
      toast.success("Xóa danh mục thành công");
    } catch (error) {
      toast.error(getError(error));
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
