import {
    Table
} from "@/components/ui/table"
import { Input } from "../ui/input"
import { CirclePlus, Download, Search } from "lucide-react"
import { Button } from "../ui/button"

interface MegaTableProps {
    title: string;
    exportCSV: boolean;
    addNew: boolean;
    searchable: boolean
    children: React.ReactNode;
}


export const MegaTable = ({ title, exportCSV, addNew, searchable, children }: MegaTableProps) => {

    return(
      <section className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-primary font-semibold md:text-2xl">{title}</h1>
          <div className="flex space-x-3">
            <div className="w-72">
              {
                searchable &&
                <form>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full appearance-none bg-background pl-8 shadow-none"
                    />
                  </div>
                </form>
              }
            </div>
            {
              exportCSV &&
              <Button variant="secondary"> 
                <Download className="mr-2 h-4 w-4" />  Export 
              </Button>
            }
            {
              addNew &&
              <Button>
                <CirclePlus className="mr-2 h-4 w-4" /> Add 
              </Button>
            }
          </div>
        </div>
        <div className="flex flex-1 p-3 rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">  
          <Table>
            {children}
            {/* <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
          </Table>
        </div>
      </section>
    )

}