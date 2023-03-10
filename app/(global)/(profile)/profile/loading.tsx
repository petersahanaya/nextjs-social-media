const ProfileLoading = () => {
  const loadArr = [1, 2, 3, 4]
  return (
    <main className="w-screen h-screen bg-slate-100">
      <header className="w-screen h-[11vh] flex justify-between items-center p-3 bg-white md:pl-20">
        <div className="w-[4rem] h-[4rem] bg-stone-600 animate-pulse rounded-full"></div>
        <div className="w-[8rem] bg-stone-600 p-3 rounded-xl animate-pulse"></div>
        <div className="w-[3rem] bg-stone-600 p-3 rounded-xl animate-pulse"></div>
      </header>
      <article className="w-screen justify-center flex items-center gap-3 flex-wrap mt-3 md:pl-20">
          {loadArr.map((_, i) => (
            <nav key={i} className="w-[220px] md:w-[200px] h-[200px] rounded-xl bg-stone-600 animate-pulse"></nav>
          ))}
      </article>
    </main>
  )
}

export default ProfileLoading