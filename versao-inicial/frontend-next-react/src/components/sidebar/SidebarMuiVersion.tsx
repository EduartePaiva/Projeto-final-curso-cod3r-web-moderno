'use client'
import categoryTreeData from "@/interfaces/categoryTreeData"
import { TreeItem } from "@mui/lab"



export default function SidebarMuiVersion({ item }: { item: categoryTreeData }) {
    const hasChild = item.children.length > 0

    if (hasChild) {
        return (
            <TreeItem
                nodeId={`${item.id}`}
                label={item.name}
                id={`${item.id}`}
            >
                {item.children.map((item) => {
                    return <SidebarMuiVersion item={item} key={item.id} />
                })}
            </TreeItem>
        )
    } else {
        return (
            <TreeItem
                nodeId={`${item.id}`}
                label={item.name}
            />
        )
    }
}