import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, useTheme } from "@mui/material";
import { GridActionsCellItem, GridToolbarQuickFilter } from "@mui/x-data-grid";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import DebButtonWithDropdown from "./DebButtonWithDropdown";

function DataTable({
  rows,
  columns,
  loading,
  editModalOpen,
  editModal,
  onDelete,
  rowActions,
  headerActions,
  ...props
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [queryOptions, setQueryOptions] = React.useState({});
  const onFilterChange = React.useCallback((filterModel) => {
    // Here you save the data you need from the filter model
    setQueryOptions({ filterModel: { ...filterModel } });
  }, []);
  const [pageSize, setPageSize] = useState(10);
  const [columnsEditable, setColumnsEditable] = useState([]);

  const generateActionColumn = (actions) => {
    return {
      field: "actions",
      type: "actions",
      getActions: (params) =>
        actions.map((action) => {
          return (
            <GridActionsCellItem
              key={action.key || action.label}
              icon={action.icon}
              label={t(action.label)}
              title={t(action.label)}
              onClick={() => action.action(params.row)}
              showInMenu={action.showInMenu}
            />
          );
        }),
    };
  };

  useEffect(() => {
    setColumnsEditable(
      rowActions ? [...columns, generateActionColumn(rowActions)] : columns
    );
  }, [rowActions, columns]);

  return (
    <>
      <Box
        mt="1rem"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}>
        <DataGrid
          {...props}
          rows={rows}
          columns={columnsEditable}
          loading={loading}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
          disableSelectionOnClick
          //Filtros:
          components={{ Toolbar: CustomToolbar }}
          onFilterModelChange={onFilterChange}
          componentsProps={{
            toolbar: {
              //Para ademas tener un filtro sencillo
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              //Opciones de exportado
              csvOptions: {
                utf8WithBom: true,
                fileName: t("SCENES_USERS_GRID_TOOLBAR_EXPORT_FILENAME"),
              },
              printOptions: {
                fileName: t("SCENES_USERS_GRID_TOOLBAR_EXPORT_FILENAME"),
                hideFooter: true,
                hideToolbar: true,
              },
              debButtonWithDropdownProps: {
                buttons: headerActions,
              },
            },
          }}
          //Para deshabilitar el selector de densidad (true)
          disableDensitySelector={false}
          //Para tener control de los textos, internacionalizados
          localeText={{
            // Root
            noRowsLabel: t("SCENES_USERS_GRID_TOOLBAR_NO_ROWS_LABEL"),
            noResultsOverlayLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_NO_RESULTS_FOUND"
            ),
            errorOverlayDefaultLabel: t("SCENES_USERS_GRID_TOOLBAR_ERROR"),

            // Density selector toolbar button text
            toolbarDensity: t("SCENES_USERS_GRID_TOOLBAR_DENSITY"),
            toolbarDensityLabel: t("SCENES_USERS_GRID_TOOLBAR_DENSITY_LABEL"),
            toolbarDensityCompact: t(
              "SCENES_USERS_GRID_TOOLBAR_DENSITY_COMPACT"
            ),
            toolbarDensityStandard: t(
              "SCENES_USERS_GRID_TOOLBAR_DENSITY_STANDARD"
            ),
            toolbarDensityComfortable: t(
              "SCENES_USERS_GRID_TOOLBAR_DENSITY_COMFORTABLE"
            ),

            // Columns selector toolbar button text
            toolbarColumns: t("SCENES_USERS_GRID_TOOLBAR_COLUMNS"),
            toolbarColumnsLabel: t("SCENES_USERS_GRID_TOOLBAR_COLUMNS_LABEL"),

            // Filters toolbar button text
            toolbarFilters: t("SCENES_USERS_GRID_TOOLBAR_FILTERS"),
            toolbarFiltersLabel: t("SCENES_USERS_GRID_TOOLBAR_FILTERS_LABEL"),
            toolbarFiltersTooltipHide: t(
              "SCENES_USERS_GRID_TOOLBAR_TOOLTIP_HIDE"
            ),
            toolbarFiltersTooltipShow: t(
              "SCENES_USERS_GRID_TOOLBAR_TOOLTIP_SHOW"
            ),
            toolbarFiltersTooltipActive: (count) =>
              count !== 1
                ? `${count}` +
                  t("SCENES_USERS_GRID_TOOLBAR_TOOLTIP_ACTIVE_PLURAL")
                : `${count}` +
                  t("SCENES_USERS_GRID_TOOLBAR_TOOLTIP_ACTIVE_SINGULAR"),

            // Quick filter toolbar field
            toolbarQuickFilterPlaceholder: t(
              "SCENES_USERS_GRID_TOOLBAR_QUICK_FILTER_PLACEHOLDER"
            ),
            toolbarQuickFilterLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_QUICK_FILTER_SEARCH_LABEL"
            ),
            toolbarQuickFilterDeleteIconLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_QUICK_FILTER_DELETE_LABEL"
            ),

            // Export selector toolbar button text
            toolbarExport: t("SCENES_USERS_GRID_TOOLBAR_EXPORT"),
            toolbarExportLabel: t("SCENES_USERS_GRID_TOOLBAR_EXPORT_LABEL"),
            toolbarExportCSV: t("SCENES_USERS_GRID_TOOLBAR_EXPORT_CSV"),
            toolbarExportPrint: t("SCENES_USERS_GRID_TOOLBAR_EXPORT_PRINT"),
            toolbarExportExcel: t("SCENES_USERS_GRID_TOOLBAR_EXPORT_EXCEL"),

            // Columns panel text
            columnsPanelTextFieldLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMNS_PANEL_FIND_LABEL"
            ),
            columnsPanelTextFieldPlaceholder: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMNS_PANEL_PLACEHOLDER"
            ),
            columnsPanelDragIconLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMNS_PANEL_DRAG_ICON_LABEL"
            ),
            columnsPanelShowAllButton: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMNS_PANEL_SHOW_ALL_BUTTON"
            ),
            columnsPanelHideAllButton: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMNS_PANEL_HIDE_ALL_BUTTON"
            ),

            // Filter panel text
            filterPanelAddFilter: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_PANEL_ADD_FILTER"
            ),
            filterPanelDeleteIconLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_PANEL_DELETE_ICON_LABEL"
            ),
            filterPanelLinkOperator: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_PANEL_LINK_OPERATOR"
            ),
            filterPanelOperators: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_PANEL_OPERATORS"
            ),
            filterPanelOperatorAnd: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_PANEL_OPERATOR_AND"
            ),
            filterPanelOperatorOr: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_PANEL_OPERATOR_OR"
            ),
            filterPanelColumns: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_PANEL_COLUMNS"
            ),
            filterPanelInputLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_PANEL_INPUT_LABEL"
            ),
            filterPanelInputPlaceholder: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_PANEL_PLACEHOLDER"
            ),

            // Filter operators text
            filterOperatorContains: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_CONTAINS"
            ),
            filterOperatorEquals: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_EQUALS"
            ),
            filterOperatorStartsWith: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_STARTS_WITH"
            ),
            filterOperatorEndsWith: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_ENDS_WITH"
            ),
            filterOperatorIs: t("SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_IS"),
            filterOperatorNot: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_NOT"
            ),
            filterOperatorAfter: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_AFTER"
            ),
            filterOperatorOnOrAfter: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_ON_OR_AFTER"
            ),
            filterOperatorBefore: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_BEFORE"
            ),
            filterOperatorOnOrBefore: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_ON_OR_BEFORE"
            ),
            filterOperatorIsEmpty: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_IS_EMPTY"
            ),
            filterOperatorIsNotEmpty: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_IS_NOT_EMPTY"
            ),
            filterOperatorIsAnyOf: t(
              "SCENES_USERS_GRID_TOOLBAR_FILTER_OPERATOR_IS_ANY_OF"
            ),

            // Filter values text
            filterValueAny: t("SCENES_USERS_GRID_TOOLBAR_FILTER_VALUE_ANY"),
            filterValueTrue: t("SCENES_USERS_GRID_TOOLBAR_FILTER_VALUE_TRUE"),
            filterValueFalse: t("SCENES_USERS_GRID_TOOLBAR_FILTER_VALUE_FALSE"),

            // Column menu text
            columnMenuLabel: t("SCENES_USERS_GRID_TOOLBAR_COLUMN_MENU_LABEL"),
            columnMenuShowColumns: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMN_MENU_SHOW_COLUMNS"
            ),
            columnMenuManageColumns: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMN_MENU_MANAGE_COLUMNS"
            ),
            columnMenuFilter: t("SCENES_USERS_GRID_TOOLBAR_COLUMN_MENU_FILTER"),
            columnMenuHideColumn: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMN_MENU_HIDE_COLUMN"
            ),
            columnMenuUnsort: t("SCENES_USERS_GRID_TOOLBAR_COLUMN_MENU_UNDORT"),
            columnMenuSortAsc: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMN_MENU_SORT_ASC"
            ),
            columnMenuSortDesc: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMN_MENU_SORT_DESC"
            ),

            // Column header text
            columnHeaderFiltersTooltipActive: (count) =>
              count !== 1
                ? `${count}` +
                  t("SCENES_USERS_GRID_TOOLBAR_COLUMN_HEADER_ACTIVE_PLURAL")
                : `${count}` +
                  t("SCENES_USERS_GRID_TOOLBAR_COLUMN_HEADER_ACTIVE_SINGULAR"),
            columnHeaderFiltersLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMN_HEADER_ACTIVE_FILTERS_LABEL"
            ),
            columnHeaderSortIconLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_COLUMN_HEADER_ACTIVE_SORT_ICON_LABEL"
            ),

            // Rows selected footer text
            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString()}` +
                  t("SCENES_USERS_GRID_TOOLBAR_FOOTER_ROW_SELECTED_PLURAL")
                : `${count.toLocaleString()}` +
                  t("SCENES_USERS_GRID_TOOLBAR_FOOTER_ROW_SELECTED_SINGULAR"),

            // Total row amount footer text
            footerTotalRows: t("SCENES_USERS_GRID_TOOLBAR_FOOTER_TOTAL_ROWS"),

            // Total visible row amount footer text
            footerTotalVisibleRows: (visibleCount, totalCount) =>
              `${visibleCount.toLocaleString()}` +
              t("SCENES_USERS_GRID_TOOLBAR_FOOTER_TOTAL_VISIBLE_ROWS") +
              `${totalCount.toLocaleString()}`,

            // Checkbox selection text
            checkboxSelectionHeaderName: t(
              "SCENES_USERS_GRID_TOOLBAR_CHECKBOX_HEADER_NAME"
            ),
            checkboxSelectionSelectAllRows: t(
              "SCENES_USERS_GRID_TOOLBAR_CHECKBOX_SELECT_ALL_ROWS"
            ),
            checkboxSelectionUnselectAllRows: t(
              "SCENES_USERS_GRID_TOOLBAR_CHECKBOX_UNSELECT_ALL_ROWS"
            ),
            checkboxSelectionSelectRow: t(
              "SCENES_USERS_GRID_TOOLBAR_CHECKBOX_SELECT_ROW"
            ),
            checkboxSelectionUnselectRow: t(
              "SCENES_USERS_GRID_TOOLBAR_CHECKBOX_UNSELECT_ROW"
            ),

            // Boolean cell text
            booleanCellTrueLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_BOOLEAN_CELL_TRUE"
            ),
            booleanCellFalseLabel: t(
              "SCENES_USERS_GRID_TOOLBAR_BOOLEAN_CELL_FALSE"
            ),

            // Actions cell more text
            actionsCellMore: t("SCENES_USERS_GRID_TOOLBAR_ACTIONS_CELL_MORE"),

            // Column pinning text
            pinToLeft: t("SCENES_USERS_GRID_TOOLBAR_PIN_TO_LEFT"),
            pinToRight: t("SCENES_USERS_GRID_TOOLBAR_PIN_TO_RIGHT"),
            unpin: t("SCENES_USERS_GRID_TOOLBAR_UNPIN"),

            // Tree Data
            treeDataGroupingHeaderName: t(
              "SCENES_USERS_GRID_TOOLBAR_TREE_DATA_GROUPING"
            ),
            treeDataExpand: t("SCENES_USERS_GRID_TOOLBAR_TREE_DATA_EXPAND"),
            treeDataCollapse: t("SCENES_USERS_GRID_TOOLBAR_TREE_DATA_COLLAPSE"),

            // Grouping columns
            groupingColumnHeaderName: t(
              "SCENES_USERS_GRID_TOOLBAR_GROUPING_COLUMN_HEADER"
            ),
            groupColumn: (name) =>
              t("SCENES_USERS_GRID_TOOLBAR_GROUPING") + `${name}`,
            unGroupColumn: (name) =>
              t("SCENES_USERS_GRID_TOOLBAR_STOP_GROUPING") + `${name}`,

            // Master/detail
            detailPanelToggle: t(
              "SCENES_USERS_GRID_TOOLBAR_DETAIL_PANEL_TOGGLE"
            ),
            expandDetailPanel: t(
              "SCENES_USERS_GRID_TOOLBAR_EXPAND_DETAIL_PANEL"
            ),
            collapseDetailPanel: t(
              "SCENES_USERS_GRID_TOOLBAR_COLLAPSE_DETAIL_PANEL"
            ),

            // Used core components translation keys
            MuiTablePagination: {
              labelRowsPerPage: t(
                "SCENES_USERS_GRID_TOOLBAR_MUI_TABLE_PAGINATION_ROWS_PER_PAGE"
              ),
              labelDisplayedRows: ({ from, to, count }) =>
                `${from} - ${to}` +
                t("SCENES_USERS_GRID_TOOLBAR_MUI_TABLE_PAGINATION_OF") +
                `${count}`,
            },

            // Row reordering text
            rowReorderingHeaderName: t(
              "SCENES_USERS_GRID_TOOLBAR_REORDERING_HEADER"
            ),

            // Aggregation
            aggregationMenuItemHeader: t(
              "SCENES_USERS_GRID_TOOLBAR_AGGREGATION_MENU_ITEM_HEADER"
            ),
            aggregationFunctionLabelSum: t(
              "SCENES_USERS_GRID_TOOLBAR_AGGREGATION_FUNCTION_LABEL_SUM"
            ),
            aggregationFunctionLabelAvg: t(
              "SCENES_USERS_GRID_TOOLBAR_AGGREGATION_FUNCTION_LABEL_AVG"
            ),
            aggregationFunctionLabelMin: t(
              "SCENES_USERS_GRID_TOOLBAR_AGGREGATION_FUNCTION_LABEL_MIN"
            ),
            aggregationFunctionLabelMax: t(
              "SCENES_USERS_GRID_TOOLBAR_AGGREGATION_FUNTION_LABEL_MAX"
            ),
            aggregationFunctionLabelSize: t(
              "SCENES_USERS_GRID_TOOLBAR_AGGREGATION_FUNCTION_LABEL_SIZE"
            ),
          }}
        />
      </Box>
    </>
  );
}

function CustomToolbar(props) {
  console.log(props);
  return (
    <GridToolbarContainer sx={{ padding: "0" }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={props.csvOptions}
        printOptions={props.printOptions}
      />
      <Box sx={{ flex: 1 }} />
      {props.showQuickFilter && (
        <GridToolbarQuickFilter {...props.quickFilterProps} />
      )}
      <DebButtonWithDropdown
        {...props.debButtonWithDropdownProps}
        sx={{
          paddingBottom: "0.5rem",
          paddingLeft: "0.5rem",
        }}></DebButtonWithDropdown>
    </GridToolbarContainer>
  );
}

export default DataTable;
