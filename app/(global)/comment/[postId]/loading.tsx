const Commentloading = () => {
    let loadArr = [1,2,3,4]
  return (
    <main className="w-screen bg-slate-100 h-screen">
       <header className="w-screen md:pl-20 lg:pl-20 xl:pl-20 h-[11vh] bg-white flex items-center p-3">
            <section className="flex items-center gap-2">
                <div className="w-[3rem] h-[3rem] rounded-full bg-stone-600 animate-pulse"></div>
                <div className="flex flex-col justify-center  gap-2">
                    <span className="bg-stone-600 p-2 w-[5rem] rounded-xl h-[1rem] animate-pulse"></span>
                    <span className="bg-stone-600 p-2 w-[7rem] rounded-xl h-[1rem] animate-pulse"></span>
                </div>
            </section>
        </header>
        <article className="w-screen bg-white p-2 md:pl-20 lg:pl-20 xl:pl-20">
            <div className="w-[90vw] m-auto md:w-[70vw] lg:w-[60vw] xl:w-[60vw] p-6 bg-stone-600 animate-pulse rounded-xl"></div>
        </article>
        <section className="mt-4 w-screen md:pl-16 lg:pl-16 xl:pl-16">
            {loadArr.map((_, i) => (
                <nav key={i} className="bg-white w-screen p-5">
                    <header className="p-3 w-full flex items-center gap-2">
                            <div className="w-[3rem] h-[3rem] bg-stone-600 animate-pulse rounded-full"></div>
                            <div className="flex flex-col justify-center gap-2">
                                <span className="w-[7rem] bg-stone-600 rounded-xl p-2 animate-pulse"></span>
                                <span className="w-[3rem] bg-stone-600 rounded-xl p-2 animate-pulse"></span>
                            </div>
                    </header>
                    <article></article>
                </nav>
            ))}
        </section>
    </main>
  )
}

export default Commentloading