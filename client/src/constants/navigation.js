import { LayoutDashboard, ShoppingCart, Users, ReceiptText, HandPlatter } from "lucide-react";


export const managerNav = [
  {
    title: "Dashboard",
    url: "manager",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "manager/products",
    icon: ShoppingCart,
  },
  // {
  //   title: "Employee",
  //   url: "manager/employees",
  //   icon: Users,
  // },
  {
    title: "Transactions",
    url: "manager/transactions",
    icon: ReceiptText,
  },
];

export const employeeNav = [
    {
        title: "Order",
        url: "employee/",
        icon: HandPlatter,
    },
    {
        title: "Transactions",
        url: "employee/my-transactions",
        icon: ReceiptText,
    }
]
