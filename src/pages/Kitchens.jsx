import { useState, useEffect } from "react"; 
import { RefreshCw, Plus, MinusSquare, Square, SquareCheck } from "lucide-react";
import { getDataFromAPI, formatDateVN } from "../utils/helpers";

export default function Kitchens({ user }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(new Set());
    
    async function getMenuData() {
        try {
            setLoading(true);
            const response = await getDataFromAPI("get-all-menus");
            setData(response);
        } catch (err) {
            console.log("Get menu data failed: ", err);
        } finally {
            setLoading(false);
        }
    }
    
    function toggleRow(id) {
        setSelected(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function toggleWeek(week) {
        const ids = week.items.map(i => i.id);
        const allSelected = ids.every(id => selected.has(id));
        setSelected(prev => {
            const next = new Set(prev);
            ids.forEach(id => (allSelected ? next.delete(id) : next.add(id)));
            return next;
        });
    }
    
    useEffect(() => {
        getMenuData();
    }, []);
    
    return (
        <div className="p-1 lg:p-2 lg:pt-0 space-y-2 animate-fade-in">
            <div className="bg-white/50 backdrop-blur-md shadow-lg p-4 pt-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-xl font-bold text-(--color-red)">Bếp ăn</h2>
                    <p className="text-sm text-gray-600 mt-0.5">Quản lý thực đơn</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={getMenuData} className="btn-secondary gap-1.5 text-xs hidden sm:inline-flex">
                        <RefreshCw size={13} /> Làm mới
                    </button>
                    <button className={`btn-primary text-xs ${!["Quản trị viên", "Quản lý"].includes(user.role) ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={["Quản trị viên", "Quản lý"].includes(user.role)}>
                        <Plus size={13} /> Thêm thực đơn
                    </button>
                </div>
                </div>
            </div>
            <div className="bg-white/50 backdrop-blur-md shadow-lg p-4 pt-6 rounded-xl">
                {data.length > 0 ? data.map((item, index) => {
                    const count = data.items.filter(i => selected.has(i.id)).length;
                    const all = count > 0 && count === data.items.length;
                    const partial = count > 0 && !all;
                    return (
                        <div className="overflow-x-auto">
                            <h3 className="font-semibold text-(--color-red) text-sm mb-2">Thực đơn tuần {formatDateVN(item.startDate)} - {formatDateVN(item.endDate)}</h3>
                            <table key={index} className="w-full min-w-max text-center">
                                <thead className="bg-gray-200 border-b border-black/25">
                                    <tr>
                                        <th className="table-header text-center" rowSpan={2} width="3%"><button onClick={() => toggleWeek(data)}>{all ? <SquareCheck size={16} /> : partial ? <MinusSquare size={16} /> : <Square size={16} />}</button></th>
                                    <th className="table-header text-center" rowSpan={2}>Thứ</th>
                                    <th className="table-header text-center" rowSpan={2}>Ăn sáng</th>
                                    <th className="table-header text-center" colSpan={2}>Ăn trưa</th>
                                    <th className="table-header text-center" rowSpan={2}>Ăn xế</th>
                                    <th className="table-header text-center" rowSpan={2}>Tráng miệng</th>
                                </tr>
                                <tr>
                                    <th className="table-header text-center">Mặn</th>
                                    <th className="table-header text-center">Canh</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/25">
                                {item.items.map((dataItem, index) => {
                                    const [dayWeek = "", dayMonth = ""] = String(dataItem.dayweek ?? "").split(" ");
                                    const [savory = "", soup = ""] = String(dataItem.lunch ?? "").split(",");
                                    return (
                                        <tr key={index} className="hover:bg-black/10 transition group">
                                            <td className="table-cell"><button onClick={() => setSelectRow(index)}>{selectRow === index ? <SquareCheck size={16} /> : <Square size={16} />}</button></td>
                                            <td className="table-cell">{dayWeek} <br/> {dayMonth}</td>
                                            <td className="table-cell">{dataItem.breakfast}</td>
                                            <td className="table-cell">{savory}</td>
                                            <td className="table-cell">{soup}</td>
                                            <td className="table-cell">{dataItem.afternoon}</td>
                                            <td className="table-cell">{dataItem.dessert}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>)
                })
                : <p className="text-center text-gray-500">Không có dữ liệu thực đơn.</p>}
            </div>
        </div>
    );   
};