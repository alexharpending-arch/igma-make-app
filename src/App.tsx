import { useEffect, useState } from "react"

const A = "/assets"

type Screen = "splash" | "welcome" | "entry" | "signup" | "signin" | "interests" | "profile" | "pin" | "forgot" | "home" | "list" | "movie" | "series"

const posters = [
  "ffca7.png",
  "ea2ec.png",
  "9cd7d.png",
  "5e251.png",
  "5ec69.png",
  "d3e61.png",
  "7496b.png",
  "54a4d.png",
  "b217c.png",
  "66bf7.png",
  "af06a.png",
]

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Horror",
  "Adventure",
  "Thriller",
  "Romance",
  "Science",
  "Music",
  "Documentary",
  "Crime",
  "war",
  "Fantasy",
  "Mystery",
  "Fiction",
  "Animation",
  "History",
  "Televisio",
  "Superheros",
  "Anime",
  "Sports",
  "English",
  "K-Drama",
  "Sci-Fi",
]

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? "logo logo-compact" : "logo"}>ADS</div>
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button className="back" onClick={onClick} aria-label="Go back">
      <img src={`${A}/b59a7.svg`} alt="" />
    </button>
  )
}

function PrimaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode
  onClick: () => void
  className?: string
}) {
  return (
    <button className={`primary ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

function SocialIcon({
  provider,
}: {
  provider: "google" | "apple" | "facebook"
}) {
  const file =
    provider === "google"
      ? "8faa1.svg"
      : provider === "apple"
        ? "1860b.svg"
        : "76c2e.svg"
  return <img src={`${A}/${file}`} alt="" />
}

function SocialRow() {
  return (
    <div className="social-row" aria-label="Social sign in options">
      {(["google", "apple", "facebook"] as const).map((provider) => (
        <button key={provider} aria-label={`Continue with ${provider}`}>
          <SocialIcon provider={provider} />
        </button>
      ))}
    </div>
  )
}

function Divider() {
  return (
    <div className="divider">
      <span />
      <p>or Continue with</p>
      <span />
    </div>
  )
}

function Welcome({ next }: { next: () => void }) {
  return (
    <main className="welcome">
      <div className="poster-field" aria-hidden="true">
        {posters.map((poster, index) => (
          <img
            key={poster}
            src={`${A}/${poster}`}
            alt=""
            style={{ "--i": index } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="welcome-fade" />
      <div className="welcome-copy">
        <h1>Welcome to FlickNest</h1>
        <p>
          The best movie streaming app of the century to make your days great !
        </p>
        <PrimaryButton onClick={next}>Get Started</PrimaryButton>
      </div>
    </main>
  )
}

function Entry({ signUp, signIn }: { signUp: () => void signIn: () => void }) {
  const providers = [
    ["google", "Google"],
    ["apple", "Apple"],
    ["facebook", "Facebook"],
  ] as const
  return (
    <main className="screen entry">
      <Logo compact />
      <h1>Let’s you in</h1>
      <div className="provider-list">
        {providers.map(([provider, label]) => (
          <button key={provider} onClick={signIn}>
            <SocialIcon provider={provider} />
            <span>Continue with {label}</span>
          </button>
        ))}
      </div>
      <div className="divider simple">
        <span />
        <p>or</p>
        <span />
      </div>
      <PrimaryButton onClick={signIn}>Get Started</PrimaryButton>
      <p className="switch-copy">
        Don’t have an account ? <button onClick={signUp}>Sign up</button>
      </p>
    </main>
  )
}

function Auth({
  mode,
  back,
  switchMode,
  next,
  forgot,
}: {
  mode: "signup" | "signin"
  back: () => void
  switchMode: () => void
  next: () => void
  forgot: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [show, setShow] = useState(false)
  const isSignIn = mode === "signin"

  return (
    <main className="screen auth">
      {isSignIn && <Back onClick={back} />}
      <Logo compact />
      <h1>{isSignIn ? "Login to Your Account" : "Create Your Account"}</h1>
      <div className="form-stack">
        <label className="field">
          <img src={`${A}/75805.svg`} alt="" />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            autoComplete="email"
          />
        </label>
        <label className={`field ${password ? "active-field" : ""}`}>
          <img src={`${A}/74534.svg`} alt="" />
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete={isSignIn ? "current-password" : "new-password"}
          />
          <button
            type="button"
            onClick={() => setShow((value) => !value)}
            aria-label="Toggle password visibility"
          >
            <img src={`${A}/a788d.svg`} alt="" />
          </button>
        </label>
      </div>
      <label className="remember">
        <input
          type="checkbox"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
        />
        <span>{remember && "✓"}</span>
        Remember me
      </label>
      <PrimaryButton onClick={next}>
        {isSignIn ? "Sign in" : "Sign up"}
      </PrimaryButton>
      {isSignIn && (
        <button className="forgot" onClick={forgot}>
          Forgot Password?
        </button>
      )}
      <Divider />
      <SocialRow />
      <p className="switch-copy">
        {isSignIn ? "Don’t have an account ? " : "Already have an account ? "}
        <button onClick={switchMode}>{isSignIn ? "Sign up" : "Sign in"}</button>
      </p>
    </main>
  )
}

function Interests({ back, next }: { back: () => void next: () => void }) {
  const [selected, setSelected] = useState<string[]>(["Action"])
  const toggle = (genre: string) =>
    setSelected((current) =>
      current.includes(genre)
        ? current.filter((item) => item !== genre)
        : [...current, genre],
    )

  return (
    <main className="screen details interests">
      <header>
        <Back onClick={back} />
        <h1>Choose Your Interest</h1>
      </header>
      <p className="intro">
        Choose your interests and get the best movie recommendations. Don’t
        worry, you can always change it later.
      </p>
      <div className="genre-grid">
        {genres.map((genre) => (
          <button
            key={genre}
            className={selected.includes(genre) ? "selected" : ""}
            onClick={() => toggle(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="dual-actions">
        <button onClick={next}>Skip</button>
        <button onClick={next}>Continue</button>
      </div>
    </main>
  )
}

function Profile({ back, next }: { back: () => void next: () => void }) {
  const [values, setValues] = useState({
    name: "",
    nickname: "",
    email: "",
    phone: "",
    gender: "",
  })
  const update = (field: keyof typeof values, value: string) =>
    setValues((current) => ({ ...current, [field]: value }))

  return (
    <main className="screen details profile">
      <header>
        <Back onClick={back} />
        <h1>Fill Your Profile</h1>
      </header>
      <div className="avatar">
        <div className="avatar-image">
          {values.name ? (
            <img src={`${A}/31c3d.png`} alt="Profile" />
          ) : (
            <>
              <img className="avatar-disc" src={`${A}/adbd7.png`} alt="" />
              <img className="avatar-symbol" src={`${A}/b3bf5.svg`} alt="" />
            </>
          )}
        </div>
        <button aria-label="Edit profile picture">
          <img src={`${A}/bc402.svg`} alt="" />
        </button>
      </div>
      <div className="profile-form">
        <input
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Full Name"
        />
        <input
          value={values.nickname}
          onChange={(e) => update("nickname", e.target.value)}
          placeholder="Nickname"
        />
        <label>
          <input
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Email"
          />
          <img src={`${A}/75805.svg`} alt="" />
        </label>
        <label className="phone">
          <img src={`${A}/c9f06.png`} alt="" />
          <span>⌄</span>
          <input
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="Phone Number"
          />
        </label>
        <label>
          <select
            value={values.gender}
            onChange={(e) => update("gender", e.target.value)}
          >
            <option value="" disabled>
              Gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
          </select>
        </label>
      </div>
      <div className="dual-actions">
        <button>Skip</button>
        <button onClick={next}>Continue</button>
      </div>
    </main>
  )
}

const numberKeys = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
]

function PinScreen({
  mode,
  back,
  next,
}: {
  mode: "create" | "forgot"
  back: () => void
  next: () => void
}) {
  const [pin, setPin] = useState("")
  const add = (key: string) => setPin((value) => (value + key).slice(0, 4))
  const complete = pin.length === 4

  return (
    <main className={`pin-screen ${complete ? "pin-complete" : ""}`}>
      <Back onClick={back} />
      <h1>{mode === "create" ? "Create New PIN" : "Forgot Password"}</h1>
      <p className="pin-instruction">
        {mode === "create"
          ? "Add a PIN number to make your account more secure."
          : `Code has been send to +1 8XX XXX ${complete ? "XX43" : "XXXX"}`}
      </p>
      <div className="pin-boxes" aria-label="Four digit PIN">
        {[0, 1, 2, 3].map((index) => (
          <button
            className={index === pin.length && !complete ? "current" : ""}
            key={index}
            onClick={() => setPin(pin.slice(0, index))}
          >
            {pin[index] ? (
              index < 2 ? (
                <img src={`${A}/63950.svg`} alt="Filled" />
              ) : (
                pin[index]
              )
            ) : index === pin.length ? (
              "_"
            ) : (
              ""
            )}
          </button>
        ))}
      </div>
      {mode === "forgot" && (
        <p className="resend">Resend code in {complete ? 52 : 55} s</p>
      )}
      <PrimaryButton
        className="pin-action"
        onClick={() => (complete ? next() : undefined)}
      >
        {mode === "create" ? "Continue" : "Verify"}
      </PrimaryButton>
      {!complete && (
        <div className="number-pad">
          <div className="suggestions">
            <span>I</span>
            <span>The</span>
            <span>Go</span>
          </div>
          <div className="key-grid">
            {numberKeys.map(([number, letters]) => (
              <button key={number} onClick={() => add(number)}>
                <b>{number}</b>
                <small>{letters}</small>
              </button>
            ))}
            <span className="decimal">.</span>
            <button onClick={() => add("0")}>
              <b>0</b>
            </button>
            <button
              className="delete-key"
              onClick={() => setPin((value) => value.slice(0, -1))}
              aria-label="Delete"
            >
              ⌫
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

const navItems = [
  ["home", "Home", "c8846.svg"],
  ["explore", "Explore", "4e7f0.svg"],
  ["list", "My List", "12bec.svg"],
  ["download", "Download", "fe9a8.svg"],
  ["profile", "Profile", "20304.svg"],
] as const

function BottomNav({
  active,
  goHome,
  goList,
}: {
  active: "home" | "list"
  goHome: () => void
  goList: () => void
}) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {navItems.map(([id, label, icon]) => (
        <button
          key={id}
          className={active === id ? "active" : ""}
          onClick={id === "home" ? goHome : id === "list" ? goList : undefined}
        >
          <img src={`${A}/${icon}`} alt="" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

function BrandHeader({ title }: { title?: string }) {
  return (
    <header className="brand-header">
      <img src={`${A}/65b82.svg`} alt="FlickNest" />
      {title && <h1>{title}</h1>}
      <button aria-label="Search">
        <img src={`${A}/6d9f2.svg`} alt="" />
      </button>
    </header>
  )
}

const homeTop = [
  ["5ec69.png", "9.8"],
  ["ea2ec.png", "9.7"],
  ["b217c.png", "9.6"],
]
const homeNew = [
  ["d3e61.png", "9.4"],
  ["9cd7d.png", "9.2"],
  ["b217c.png", "9.3"],
]

function PosterRow({
  title,
  items,
  onPoster,
}: {
  title: string
  items: string[][]
  onPoster: (index: number) => void
}) {
  return (
    <section className="poster-section">
      <header>
        <h2>{title}</h2>
        <button>See all</button>
      </header>
      <div className="poster-row">
        {items.map(([image, score], index) => (
          <button
            className="poster-card"
            key={`${image}-${index}`}
            onClick={() => onPoster(index)}
          >
            <img src={`${A}/${image}`} alt="" />
            <span>{score}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function Home({
  openMovie,
  openSeries,
  openList,
  saveMovie,
}: {
  openMovie: () => void
  openSeries: () => void
  openList: () => void
  saveMovie: () => void
}) {
  return (
    <main className="home-screen">
      <section className="home-hero">
        <img src={`${A}/4acdb.png`} alt="Deadpool and Wolverine" />
        <BrandHeader />
        <div className="hero-copy">
          <h1>Deadpool &amp; Wolverine</h1>
          <p>Action, Superhero, Science Fiction ...</p>
          <div>
            <button onClick={openMovie}>●&nbsp; Play</button>
            <button onClick={saveMovie}>＋&nbsp; My List</button>
          </div>
        </div>
      </section>
      <div className="home-content">
        <PosterRow
          title="Top 10 Movies This Week"
          items={homeTop}
          onPoster={openMovie}
        />
        <PosterRow
          title="New Releases"
          items={homeNew}
          onPoster={(index) => (index === 2 ? openSeries() : openMovie())}
        />
      </div>
      <BottomNav active="home" goHome={() => undefined} goList={openList} />
    </main>
  )
}

const listPosters = [
  "5ec69.png",
  "a770f.png",
  "ffca7.png",
  "68ab1.png",
  "54a4d.png",
  "9cd7d.png",
  "b217c.png",
  "7496b.png",
]

function MyList({
  saved,
  goHome,
  openMovie,
}: {
  saved: boolean
  goHome: () => void
  openMovie: () => void
}) {
  const [category, setCategory] = useState("All Categories")
  return (
    <main className="list-screen">
      <BrandHeader title="My List" />
      {saved ? (
        <>
          <div className="category-row">
            {["All Categories", "Movie", "TV Series"].map((item) => (
              <button
                key={item}
                className={category === item ? "selected" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="list-grid">
            {listPosters.map((poster, index) => (
              <button className="poster-card" key={poster} onClick={openMovie}>
                <img src={`${A}/${poster}`} alt="" />
                <span>{index === 1 ? "9.7" : "9.8"}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <section className="empty-list">
          <div>
            <img src={`${A}/7a900.svg`} alt="" />
            <img src={`${A}/01ce5.svg`} alt="" />
          </div>
          <h2>Your List is Empty</h2>
          <p>It seems that you haven’t added any movies to the list</p>
        </section>
      )}
      <BottomNav active="list" goHome={goHome} goList={() => undefined} />
    </main>
  )
}

const castMovie = [
  ["b6eb3.png", "Shawn Levy", "Director"],
  ["16f4a.png", "Ryan Reynolds", "Cast"],
  ["0b585.png", "Hugh Jackman", "Cast"],
  ["c7a1c.png", "Shawn Levy", "Director"],
]

function ShareSheet({ close }: { close: () => void }) {
  const apps = [
    ["eef0c.png", "WhatsApp"],
    ["773af.png", "Twitter"],
    ["7dda4.png", "Facebook"],
    ["150f4.png", "Instagram"],
    ["9f293.png", "Yahoo"],
    ["97fac.png", "Tiktok"],
    ["46fed.png", "Chat"],
    ["5bce5.png", "WeChat"],
  ]
  return (
    <div className="share-layer" onClick={close}>
      <section
        className="share-sheet"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="share-handle" />
        <h2>Send to</h2>
        <div className="share-grid">
          {apps.map(([image, label]) => (
            <button key={label}>
              <img src={`${A}/${image}`} alt="" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function Detail({ kind, back }: { kind: "movie" | "series" back: () => void }) {
  const [tab, setTab] = useState<"Trailers" | "More like This" | "Comments">(
    "Trailers",
  )
  const [share, setShare] = useState(false)
  const series = kind === "series"
  const cast = series
    ? [
        ["4a9a6.png", "Steve Blackman", "Director"],
        ["32305.png", "Elliot Page", "Cast"],
        ["df689.png", "Tom Hopper", "Cast"],
        ["8ce93.png", "Shawn Levy", "Director"],
      ]
    : castMovie
  return (
    <main className="detail-screen">
      <div className="detail-hero">
        <img
          src={`${A}/${series ? "f09ce.png" : "4acdb.png"}`}
          alt={series ? "The Umbrella Academy" : "Deadpool and Wolverine"}
        />
        <Back onClick={back} />
        <img className="cast-icon" src={`${A}/ab2ba.svg`} alt="" />
      </div>
      <article className="detail-body">
        <div className="detail-title-row">
          <h1>{series ? "The Umbrella Academy" : "Deadpool & Wolverine"}</h1>
          <button>
            <img src={`${A}/e1317.svg`} alt="Bookmark" />
          </button>
          <button onClick={() => setShare(true)}>
            <img src={`${A}/abc23.svg`} alt="Share" />
          </button>
        </div>
        <div className="metadata">
          <img src={`${A}/f7d4c.svg`} alt="" />
          <span>{series ? "7.8" : "9.8"}</span>
          <span>›</span>
          <span>2024</span>
          <b>18+</b>
          <b>Subtitle</b>
        </div>
        <div className="detail-actions">
          <button>●&nbsp; Play</button>
          <button>
            <img src={`${A}/5a84c.svg`} alt="" /> Download
          </button>
        </div>
        <p className="genre">
          Genre : Action, Superhero, Science Fiction,{" "}
          {series ? "Fantasy, Comedy" : "Thriler, ..."}
        </p>
        <p className="synopsis">
          {series
            ? "On the same day in October 1989, forty-three infants are inexplicably born to random, unconnected women who showed no signs of pregnancy the day before. Seven are ... "
            : "Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.... "}
          <button>View More</button>
        </p>
        <div className="cast-row">
          {cast.map(([image, name, role]) => (
            <div key={`${name}-${role}`}>
              <img src={`${A}/${image}`} alt="" />
              <p>
                {name}
                <small>{role}</small>
              </p>
            </div>
          ))}
        </div>
        {series && (
          <section className="episodes">
            <header>
              <h2>Episodes</h2>
              <button>Season 3⌄</button>
            </header>
            <div>
              {[
                ["c05f5.png", "Episode 1"],
                ["e7094.png", "Episode 2"],
                ["12362.png", "Episode 3"],
              ].map(([image, label]) => (
                <figure key={label}>
                  <img src={`${A}/${image}`} alt="" />
                  <span>▶</span>
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        <div className="detail-tabs">
          {(["Trailers", "More like This", "Comments"] as const).map((item) => (
            <button
              key={item}
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {tab === "More like This" ? (
          <div className="recommend-grid">
            {[
              ["c14a6.png", "8.6"],
              ["45ce6.png", "9.2"],
            ].map(([image, score]) => (
              <div className="poster-card" key={image}>
                <img src={`${A}/${image}`} alt="" />
                <span>{score}</span>
              </div>
            ))}
          </div>
        ) : tab === "Comments" ? (
          <p className="comments">No comments yet.</p>
        ) : (
          <div className="trailer-list">
            {[
              [series ? "12362.png" : "26092.png", "Trailer 3: Final"],
              ["45ce6.png", "Trailer 2"],
            ].map(([image, title]) => (
              <button key={title}>
                <span className="trailer-thumb">
                  <img src={`${A}/${image}`} alt="" />
                  <i>▶</i>
                </span>
                <strong>{title}</strong>
                <small>08 Episode</small>
                <em>Update</em>
              </button>
            ))}
          </div>
        )}
      </article>
      {share && <ShareSheet close={() => setShare(false)} />}
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (screen !== "splash") return
    const timer = window.setTimeout(() => setScreen("welcome"), 1300)
    return () => window.clearTimeout(timer)
  }, [screen])

  if (screen === "splash") {
    return (
      <main className="splash" onClick={() => setScreen("welcome")}>
        <Logo />
        <img src={`${A}/b2866.svg`} alt="Loading" />
      </main>
    )
  }
  if (screen === "welcome") return <Welcome next={() => setScreen("entry")} />
  if (screen === "entry")
    return (
      <Entry
        signUp={() => setScreen("signup")}
        signIn={() => setScreen("signin")}
      />
    )
  if (screen === "signup")
    return (
      <Auth
        mode="signup"
        back={() => setScreen("entry")}
        switchMode={() => setScreen("signin")}
        next={() => setScreen("interests")}
        forgot={() => setScreen("forgot")}
      />
    )
  if (screen === "signin")
    return (
      <Auth
        mode="signin"
        back={() => setScreen("entry")}
        switchMode={() => setScreen("signup")}
        next={() => setScreen("interests")}
        forgot={() => setScreen("forgot")}
      />
    )
  if (screen === "interests")
    return (
      <Interests
        back={() => setScreen("signin")}
        next={() => setScreen("profile")}
      />
    )
  if (screen === "profile")
    return (
      <Profile
        back={() => setScreen("interests")}
        next={() => setScreen("pin")}
      />
    )
  if (screen === "pin")
    return (
      <PinScreen
        mode="create"
        back={() => setScreen("profile")}
        next={() => setScreen("home")}
      />
    )
  if (screen === "forgot")
    return (
      <PinScreen
        mode="forgot"
        back={() => setScreen("signin")}
        next={() => setScreen("home")}
      />
    )
  if (screen === "home")
    return (
      <Home
        openMovie={() => setScreen("movie")}
        openSeries={() => setScreen("series")}
        openList={() => setScreen("list")}
        saveMovie={() => setSaved(true)}
      />
    )
  if (screen === "list")
    return (
      <MyList
        saved={saved}
        goHome={() => setScreen("home")}
        openMovie={() => setScreen("movie")}
      />
    )
  if (screen === "series")
    return <Detail kind="series" back={() => setScreen("home")} />
  return <Detail kind="movie" back={() => setScreen("home")} />
}
