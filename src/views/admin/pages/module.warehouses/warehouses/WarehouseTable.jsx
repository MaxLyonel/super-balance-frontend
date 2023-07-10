import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox,
    IconButton,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { useSelectorStore } from '../../../../../hooks';
import { SeverityPill } from '../../../../../components';
import { Delete, DeleteOutline, EditOutlined } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

export const WarehouseTable = React.memo((props) => {
    const {
        stateSelect = false,
        stateMultiple = true,
        allItems = [],
        items = [],
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        onEdit,
        handleEdit,
        onDelete,
        itemSelect,
    } = props;

    const { selection = [] } = useSelector((state) => state.selections);
    const { selectAll, selectOne, deselectAll, deselectOne } = useSelectorStore();
    const { data } = useSelector((state) => state.auth);
    const permisions = () => {
        return data ? data.roleId.permisionIds : [];
    };
    return (
        <Card>
            <TableContainer>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table aria-label="a dense table">

                        <TableHead>
                            <TableRow>
                                {
                                    stateSelect
                                    && <TableCell padding="checkbox">
                                        {stateMultiple && <Checkbox
                                            checked={allItems.map(e => e.id).every(id => selection.includes(id))}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    selectAll?.(allItems.map(e => e.id));
                                                } else {
                                                    deselectAll?.(allItems.map(e => e.id));
                                                }
                                            }}
                                        />}
                                    </TableCell>
                                }
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Dirección
                                </TableCell>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                {
                                    !stateSelect && <TableCell>
                                        Estado
                                    </TableCell>
                                }
                                {
                                    !stateSelect && <TableCell>
                                        Acciones
                                    </TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((warehouse) => {
                                const isSelected = selected.includes(warehouse.id);
                                return (
                                    <TableRow
                                        hover
                                        key={warehouse.id}
                                    >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(value) => {
                                                        console.log(value)
                                                        if (stateMultiple) {
                                                            if (value.target.checked) {
                                                                selectOne?.(warehouse.id);
                                                            } else {
                                                                deselectOne?.(warehouse.id);
                                                            }
                                                        } else {
                                                            itemSelect(warehouse)
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>
                                            {warehouse.name}
                                        </TableCell>
                                        <TableCell>
                                            {warehouse.address}
                                        </TableCell>
                                        <TableCell>
                                            {warehouse.phone}
                                        </TableCell>

                                        {
                                            !stateSelect && <TableCell>
                                                <SeverityPill color={warehouse.state ? 'success' : 'error'}>
                                                    {warehouse.state ? 'Activo' : 'Inactivo'}
                                                </SeverityPill>
                                            </TableCell>
                                        }

                                        {
                                            !stateSelect && <TableCell>
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    <IconButton
                                                        onClick={() => handleEdit(warehouse)}
                                                        disabled={permisions().filter((e) => e.name === 'Editar tipos de usuario').length == 0}
                                                    >
                                                        <EditOutlined color="info" />
                                                    </IconButton>
                                                    <Switch
                                                        checked={warehouse.state}
                                                        onChange={(event) => onEdit({ ...warehouse, state: event.target.checked, userId: warehouse.userId.id, userIds: warehouse.userIds.map(e => e.id) })}
                                                        color="success"
                                                        size="small"
                                                        disabled={permisions().filter((e) => e.name === 'Eliminar tipos de usuario').length == 0}
                                                    />
                                                    <IconButton
                                                        onClick={() => onDelete(warehouse.id)}
                                                        disabled={permisions().filter((e) => e.name === 'Eliminar tipos de usuario').length == 0}
                                                    >
                                                        <DeleteOutline color="error" />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                        }
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </TableContainer>
            <TablePagination
                component="div"
                count={allItems.length}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
});

WarehouseTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};