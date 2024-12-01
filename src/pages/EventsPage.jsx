import { Link } from 'react-router-dom'
import { HeaderNav } from '../components/HeaderNav'

export function EventsPage(){
    return (
        <>
        <HeaderNav />
        <div className="items-center justify-center container mx-auto text-justify">
            <h1 className="text-center p-7">Events List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
                <div className="rounded-xl shadow-lg m-10">
                    <div className="p-5 flex flex-col">
                        <div className="rounded-xl overflow-hidden">
                            <img src="" alt="wa" />
                        </div>
                        <h5 className="text-2xl md:text-3xl font-medium mt-3">Title ramdom</h5>
                        <p className="text-slate-500 text-lg mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, dolorem fuga. Sapiente possimus officiis, consequatur explicabo, provident quam asperiores vero eaque eveniet consectetur accusantium autem! Quisquam eos ullam repellendus quo.</p>
                        <Link to="/events/detail" className="text-center bg-blue-400 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-700 focus:scale-95 transition-all duration-200 ease-out">Inscribirse</Link>
                    </div>

                </div>
                <div className="rounded-xl shadow-lg m-10">
                    <div className="p-5 flex flex-col">
                        <div className="rounded-xl overflow-hidden">
                            <img src="" alt="wa" />
                        </div>
                        <h5 className="text-2xl md:text-3xl font-medium mt-3">Title ramdom</h5>
                        <p className="text-slate-500 text-lg mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, dolorem fuga. Sapiente possimus officiis, consequatur explicabo, provident quam asperiores vero eaque eveniet consectetur accusantium autem! Quisquam eos ullam repellendus quo.</p>
                        <a className="text-center bg-blue-400 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-700 focus:scale-95 transition-all duration-200 ease-out">Inscribirse</a>
                    </div>

                </div> 
            
            </div>
        </div>
        </>
    )
}
