import React from 'react';
import DataTable from 'react-data-table-component';
import { Spinner } from 'flowbite-react';
import './../../assets/Components/admin/CustomDataTable.scss';

const Loading = () => (
  <div className="text-center">
    <Spinner />
  </div>
);

const CustomDataTable = ({ columns, data, isLoading }) => {
  return (
    <div className="custom-data-table">
      <DataTable
        striped
        columns={columns}
        data={data}
        progressPending={isLoading}
        progressComponent={<Loading />}
        noDataComponent={<div className="p-4 text-center">No hay datos disponibles</div>}
        pagination
      />
    </div>
  );
};

export default CustomDataTable;
