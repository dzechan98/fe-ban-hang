import {
  ProductResponse,
  useDeleteProduct,
  useListProducts,
} from "@api/products";
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
      headerName: "Tên sản phẩm",
      minWidth: 250,
      wrapText: true,
      cellRenderer: ({ data }: ICellRendererParams<ProductResponse>) =>
        data && (
          <Typography fontSize="14px">{capitalizeWords(data.title)}</Typography>
        ),
      cellStyle: styleCenter,
    },
    {
      headerName: "Danh mục",
      maxWidth: 200,
      wrapText: true,
      valueGetter: ({ data }) => data && capitalizeWords(data.category.title),
      cellStyle: styleCenter,
    },
    {
      headerName: "Thumbnail",
      autoHeight: true,
      width: 160,
      cellRenderer: ({ data }: ICellRendererParams<ProductResponse>) =>
        data && (
          <Stack alignItems="center" justifyContent="center" padding={1}>
            <img
              src={data.image_thumbnail}
              alt={data.title}
              style={{
                display: "block",
                width: 120,
                height: 80,
                objectFit: "cover",
                borderRadius: "2px",
              }}
              loading="lazy"
            />
          </Stack>
        ),
      cellStyle: styleCenter,
    },
    {
      headerName: "Giá",
      valueGetter: ({ data }) =>
        data && `${data.price.toLocaleString("vi-VN")}đ`,
      cellStyle: styleCenter,
      flex: 1,
    },
    {
      headerName: "Số lượng",
      field: "quantity",
      cellStyle: styleCenter,
      flex: 1,
    },
    {
      headerName: "Đã bán",
      field: "sold",
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
      cellRenderer: ({ data }: ICellRendererParams<ProductResponse>) =>
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
  ] as ColDef<ProductResponse>[];
};

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 5);

  const deleteProductDisclosure = useDisclosure({});

  const { data, isLoading, isFetching } = useListProducts({ page, limit });

  console.log({ data, isFetching, isLoading });

  const [idProduct, setIdProduct] = useState("");
  const deleteProductMutation = useDeleteProduct({
    queryKey: ["listProducts", page, limit],
  });

  const handleClickEdit = (id: string) => {
    navigate(`${ROUTES.products.root}/${id}`);
  };

  const handleClickDelete = (id: string) => {
    setIdProduct(id);
    deleteProductDisclosure.onOpen();
  };

  const columnDefs = useMemo(
    () => getColumns(handleClickEdit, handleClickDelete),
    []
  );

  const handleConfirmDelete = async () => {
    try {
      await deleteProductMutation.mutateAsync(idProduct);
      setIdProduct("");
      deleteProductDisclosure.onClose();
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleCloseDialog = () => {
    setIdProduct("");
    deleteProductDisclosure.onClose();
  };

  const totalPage = useMemo(() => {
    if (data) {
      return Math.ceil(data?.count / limit);
    }
  }, [limit, data]);

  return (
    <Page title="Danh sách sản phẩm">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Typography color="primary.main" fontSize="24px">
          Danh sách sản phẩm
        </Typography>
        <RouterLink to="./new">
          <Button variant="outlined">Thêm sản phẩm</Button>
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
        open={deleteProductDisclosure.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </Page>
  );
};
