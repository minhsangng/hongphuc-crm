import { useState, useEffect } from "react"; 
import { RefreshCw, Plus, Square, SquareCheck, Edit } from "lucide-react";
import { getDataFromAPI, formatDateVN } from "../utils/helpers";
import Loader from "../components/Loader";

const getWeekOfMonth = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);

    const firstDay = new Date(year, month - 1, 1);
    const offset = (firstDay.getDay() + 6) % 7;

    return Math.ceil((day + offset) / 7);
};

const parseYMD = (str) => {
    const [y, m, d] = str.split("T")[0].split("-").map(Number);
    return new Date(y, m - 1, d);
};

const getDateByDayweek = (startDate, dayweek) => {
    const start = parseYMD(startDate);
    const startDow = start.getDay() === 0 ? 7 : start.getDay();
    const monday = new Date(start);
    monday.setDate(start.getDate() - (startDow - 1));

    const target = new Date(monday);
    target.setDate(monday.getDate() + (Number(dayweek) - 2));

    const dd = String(target.getDate()).padStart(2, "0");
    const mm = String(target.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}`;
};

export default function Kitchens({ user }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState('--');
    
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
    
    useEffect(() => {
        getMenuData();
    }, []);
    
    return (
        <div className="p-1 lg:p-2 lg:pt-0 space-y-2 animate-fade-in min-h-[82vh]">
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
            <div className="bg-white/50 backdrop-blur-md shadow-lg px-4 py-6 rounded-xl">
                {loading ? <div className="w-full min-h-[50vh] flex items-center justify-center bg-white"><Loader /></div> : data.length > 0 ? data.map((item, index) => {
                    if (item.items.length > 0) {
                        const weekOfMonth = getWeekOfMonth(item.startDate);
                        
                        return (
                            <div key={index} className={`overflow-x-auto ${index > 0 ? "mt-4" : ""}`}>
                                <h3 className="font-semibold text-(--color-red) text-sm mb-2">Thực đơn tuần {weekOfMonth + " (" + formatDateVN(item.startDate)} - {formatDateVN(item.endDate) + ")"}</h3>
                                <table className="w-full min-w-max text-center">
                                    <thead className="bg-gray-200 border-b border-black/25">
                                        <tr>
                                            <th className="table-header text-center" rowSpan={2}><div className="flex items-center justify-center"><button className={`${(selected !== '--' && selected.split('')[0].includes(String(index))) ? 'opacity-100' : 'opacity-0'} flex flex-col items-center justify-center gap-1 text-(--color-gold) transition-opacity ease-linear`}><Edit size={16} /><span>Sửa</span></button></div></th>
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
                                        {[...item.items]
                                            .sort((a, b) => Number(a.dayweek) - Number(b.dayweek))
                                            .map((dataItem, itemsIndex)  => {
                                            const [savory = "", soup = ""] = String(dataItem.lunch ?? "").split(",");
                                            const rowIndex = String(index) + String(itemsIndex);
                                            return (
                                                <tr key={itemsIndex} className="hover:bg-black/10 transition group cursor-pointer" onClick={() => setSelected(selected === rowIndex ? '--' : rowIndex)}>
                                                    <td className="table-cell"><div className="flex items-center justify-center">{selected === rowIndex ? <SquareCheck size={16} className="text-green-500" /> : <Square size={16} />}</div></td>
                                                    <td className="table-cell">{dataItem.dayweek} <br/> ({getDateByDayweek(item.startDate, dataItem.dayweek)})</td>
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
                            </div>
                        )
                    }
                })
                : <p className="text-center text-gray-500">Không có dữ liệu thực đơn.</p>}
            </div>
        </div>
    );   
};