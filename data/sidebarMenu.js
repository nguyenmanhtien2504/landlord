import { Airplay, BarChart, CreditCard, Grid, Layout, Lock, MapPin, User, Users } from "react-feather";
import { getCookie } from 'cookies-next';

export const SidebarMenuItem = [
    {
        title: 'Bảng điều khiển',
        icon: <Airplay />,
        type: 'link',
        path: "/dashboard"
    },
    {
        title: 'Tài sản',
        icon: <Grid />,
        type: 'sub',
        children: [
            {
                path: "/myproperties/add-property",
                title: 'Thêm tài sản',
                type: 'link'
            },
            // {
            //     path: "/myproperties/edit-property",
            //     title: 'Chỉnh sửa tài sản',
            //     type: 'link'
            // },
            {
                path: "/myproperties/propertylist",
                title: 'Danh sách tài sản',
                type: 'link'
            },

        ]
    },
    {
        title: 'Người cho thuê',
        icon: <User />,
        type: 'sub',
        children: [
            {
                path: "/agents/profile",
                title: 'Thông tin',
                type: 'link'
            },

            {
                path: "/agents/edit-agent",
                title: 'Chỉnh sửa',
                type: 'link'
            },

        ]
    },
    {
        title: 'Bản đồ',
        icon: <MapPin />,
        type: 'link',
        path: "/map"
    },
    // {
    //     title: 'Quản lý',
    //     icon: <BarChart />,
    //     type: 'link',
    //     path: '/reports?id=' + getCookie('lessorId')
    // },
]