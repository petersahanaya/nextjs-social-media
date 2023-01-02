const Postloading = () => {
  return (
    <main className="w-screen bg-slate-100">
       <header className="w-screen h-[11vh] bg-white flex items-center p-3">
            <section className="flex items-center gap-2">
                <div className="w-[3rem] h-[3rem] rounded-full bg-stone-600 animate-pulse"></div>
                <div className="flex flex-col justify-center  gap-2">
                    <span className="bg-stone-600 p-2 w-[5rem] rounded-xl h-[1rem] animate-pulse"></span>
                    <span className="bg-stone-600 p-2 w-[7rem] rounded-xl h-[1rem] animate-pulse"></span>
                </div>
            </section>
        </header>
        <article className="w-[90vw] m-auto p-6 bg-stone-600 animate-pulse rounded-xl"></article>
        <footer className="fixed bottom-0 right-0 w-screen h-[11vh] bg-white flex justify-around items-center">
            <div className="bg-stone-600 animate-pulse w-[3rem] h-[3rem] rounded-full"></div>
            <div className="bg-stone-600 animate-pulse w-[3rem] h-[3rem] rounded-full"></div>
            <div className="bg-stone-600 animate-pulse w-[3rem] h-[3rem] rounded-full"></div>
        </footer>
    </main>
  )
}

export default Postloading