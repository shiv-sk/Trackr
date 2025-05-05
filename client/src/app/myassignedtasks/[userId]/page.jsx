export default function MyAssignedTasks(){
    return(
        <div className="min-h-screen flex flex-col justify-center items-center py-8 px-4">
            <h1 className="text-lg font-bold mb-3.5">MyAssignedTask!</h1>
            <div className="flex flex-wrap gap-2.5 justify-center">
                <div className="card w-96 shadow-lg">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Task-Tile!</h2>
                        <p className="font-light text-lg">Task Description.</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-neutral shadow-lg">More</button>
                        <button className="btn btn-neutral shadow-lg">MarkAsDone</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 shadow-lg">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Task-Tile!</h2>
                        <p className="font-light text-lg">Task Description.</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-neutral shadow-lg">More</button>
                        <button className="btn btn-neutral shadow-lg">MarkAsDone</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 shadow-lg">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Task-Tile!</h2>
                        <p className="font-light text-lg">Task Description.</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-neutral shadow-lg">More</button>
                        <button className="btn btn-neutral shadow-lg">MarkAsDone</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}