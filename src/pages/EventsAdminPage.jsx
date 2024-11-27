import { HeaderNav } from '../components/HeaderNav'
import { Trash2, Eye } from 'lucide-react'

export function EventsAdminPage(){
    return (
        <>
        <HeaderNav />
        <div className="container mx-auto px-4 pt-20">  {/* Added pt-20 to create padding at the top */}
            <div className="flex justify-between items-center my-6">
                <h1 className="text-3xl font-bold">Events List</h1>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Create Event
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4].map((item) => (
                    <div key={item} className="rounded-xl shadow-lg bg-white">
                        <div className="p-5 flex flex-col">
                            <div className="rounded-xl overflow-hidden mb-4">
                                <img 
                                    src="" 
                                    alt="Event" 
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <h5 className="text-2xl md:text-3xl font-medium mt-3">Title Random</h5>
                            <p className="text-slate-500 text-lg mt-3 mb-4">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, dolorem fuga. Sapiente possimus officiis, consequatur explicabo.
                            </p>
                            <div className="flex space-x-4">
                                <button className="flex-1 flex items-center justify-center bg-blue-400 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:scale-95 transition-all duration-200 ease-out">
                                    <Eye className="mr-2" size={20} /> Details
                                </button>
                                <button className="flex-1 flex items-center justify-center bg-red-400 py-2 rounded-lg font-semibold hover:bg-red-700 focus:scale-95 transition-all duration-200 ease-out">
                                    <Trash2 className="mr-2" size={20} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}