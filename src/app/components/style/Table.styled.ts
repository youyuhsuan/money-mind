"use client";

import styled from "styled-components";
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(242, 242, 242, 0.1);
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

const DeleteCell = styled(TableCell)`
  text-align: right;
  padding-right: 10px;
`;

const DeleteIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #808080;
  transition: color 0.3s ease;

  &:hover {
    color: #ff0000;
  }
`;

export {
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  DeleteCell,
  DeleteIconButton,
};
