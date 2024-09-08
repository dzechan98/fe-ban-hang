import { Pagination, Skeleton, Stack } from "@mui/material";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { useNavigate } from "react-router-dom";

interface TableProps<T> extends AgGridReactProps {
  rowData: T[];
  columnDefs: (ColDef<T> | ColGroupDef<T>)[] | null;
  totalPage?: number;
  page?: number;
  limit?: number;
  loading?: boolean;
  showPagination?: boolean;
}

export const Table = <T extends object>({
  columnDefs,
  rowData,
  totalPage = 1,
  page = 1,
  limit = 10,
  loading = false,
  showPagination = true,
  ...props
}: TableProps<T>) => {
  const navigate = useNavigate();

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    navigate(`${location.pathname}?page=${pageNumber}&limit=${limit}`);
  };

  return (
    <div className="ag-theme-quartz">
      {!loading && (
        <>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            domLayout="autoHeight"
            rowSelection="multiple"
            {...props}
          />
          {showPagination && (
            <Stack alignItems="center" marginTop={2}>
              <Pagination
                count={totalPage}
                variant="outlined"
                shape="rounded"
                color="primary"
                onChange={handleChangePage}
                defaultPage={page}
              />
            </Stack>
          )}
        </>
      )}
      {loading &&
        Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton variant="text" height={50} key={index} />
          ))}
    </div>
  );
};
