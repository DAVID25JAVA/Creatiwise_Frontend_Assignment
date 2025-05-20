"use client";
import { generatedArticles } from "../../../public/assets";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [tabFilter, setTabFilter] = useState("generated");

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "keyword",
      header: "Keyword [Traffic]",
      cell: ({ row }) => `${row.original.keyword} [${row.original.traffic}]`,
    },
    {
      accessorKey: "words",
      header: "Words",
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
    },

    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const article = row.original;

        return (
          <Dialog className="">
            <DialogTrigger asChild>
              <span
                onClick={() => setSelectedArticle(article)}
                className="text-green-500  font-medium cursor-pointer border border-green-300 px-4 py-1 rounded hover:bg-green-50 transition"
              >
                View
              </span>
            </DialogTrigger>
            <DialogContent className="max-w-md p-5 pt-10">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-black">
                  {selectedArticle?.title}
                </DialogTitle>
                <DialogDescription className="mt-2 space-y-1 text-sm text-gray-700">
                  <p>
                    <strong>Keyword:</strong> {selectedArticle?.keyword}
                  </p>
                  <p>
                    <strong>Traffic:</strong>
                    {selectedArticle?.traffic}
                  </p>
                  <p>
                    <strong>Words:</strong>
                    {selectedArticle?.words}
                  </p>
                  <p>
                    <strong>Created On:</strong>
                    {selectedArticle?.createdOn}
                  </p>
                  <p>
                    <strong>Published:</strong>{" "}
                    {selectedArticle?.publish ? "Yes" : "No"}
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      },
    },

    {
      accessorKey: "publish",
      header: "Publish",
      cell: ({ row }) => {
        const isPublished = row.original.publish;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-black"
              >
                {isPublished ? (
                  <span className="text-green-500">✅</span>
                ) : (
                  <span className="text-red-500 text-xl">🌐</span>
                )}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => console.log("Publish", row.original.title)}
              >
                Publish Now
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Unpublish", row.original.title)}
              >
                Unpublish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: generatedArticles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className=" min-h-screen flex justify-center items-center  ">
      <div className="md:max-w-6xl w-full mx-auto">
        <div className="2xl:container 2xl:mx-auto">
          <div className=" w-full overflow-x-auto rounded-md border bg-white p-4">
            <p className="text-black font-bold text-2xl text-center my-5">
              Articles
            </p>

            <div className="flex justify-center hidden md:block items-center">
              <Tabs
                value={tabFilter}
                onValueChange={setTabFilter}
                className="w-[500px]"
              >
                <TabsList>
                  <TabsTrigger
                    value="generated"
                    className={`text-black p-2 ${
                      tabFilter === "generated"
                        ? "  text-black border border-blue-500"
                        : ""
                    }`}
                  >
                    Generated Articles
                  </TabsTrigger>
                  <TabsTrigger
                    value="published"
                    className={`text-black p-2 ${
                      tabFilter === "published"
                        ? "text-black border border-blue-500"
                        : ""
                    }`}
                  >
                    Published Articles
                  </TabsTrigger>
                  <TabsTrigger
                    value="scheduled"
                    className={`text-black p-2 ${
                      tabFilter === "scheduled"
                        ? "text-black border border-blue-500"
                        : ""
                    }`}
                  >
                    Scheduled Articles
                  </TabsTrigger>
                  <TabsTrigger
                    value="archived"
                    className={`text-black p-2 ${
                      tabFilter === "archived"
                        ? "text-black border border-blue-500 bg-blue-600"
                        : ""
                    }`}
                  >
                    Archived Articles
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center py-4 gap-3">
              <Input
                placeholder="Filter titles..."
                value={table.getColumn("title")?.getFilterValue() || ""}
                onChange={(e) =>
                  table.getColumn("title")?.setFilterValue(e.target.value)
                }
                className="max-w-sm text-black "
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto text-black">
                    Columns <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((col) => col.getCanHide())
                    .map((col) => (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        className="capitalize"
                        checked={col.getIsVisible()}
                        onCheckedChange={(value) =>
                          col.toggleVisibility(!!value)
                        }
                      >
                        {col.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border overflow-x-auto p-2">
              <Table className="min-w-[500px]">
                <TableHeader>
                  {table.getHeaderGroups().map((group) => (
                    <TableRow key={group.id}>
                      {group.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="text-black font-semibold p-4"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="">
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="text-gray-600 p-4"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-sm text-muted-foreground flex-1">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-black"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-black"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
