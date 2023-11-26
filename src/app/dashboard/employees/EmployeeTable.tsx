import React from 'react';
import {Table} from "antd";


const columns = [
    {
        title: 'ID'
    },
    {
        title: 'Name'
    },

    {
        title: 'Birthdate'
    },
    {
        title: 'Gender'
    },
    {
        title: 'Address'
    },
    {
        title: 'Phone number'
    },
    {
        title: 'Degree'
    },
    {
        title: 'Degree Year'
    },
    {
        title: 'Start Date'
    },
    {
        title: 'Role'
    },
    {
        title: 'Department Name'
    },




]
// const dataSource = [
//     {
//         key: '1',
//         name: 'Mike',
//         age: 32,
//         address: '10 Downing Street',
//     },
//     {
//         key: '2',
//         name: 'John',
//         age: 42,
//         address: '10 Downing Street',
//     },
// ];
//
// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age',
//         key: 'age',
//     },
//     {
//         title: 'Address',
//         dataIndex: 'address',
//         key: 'address',
//     },
// ];
const EmployeeTable = () => {
    return (
        <>
            <Table  columns={columns}/>
        </>
    );
};

export default EmployeeTable;
