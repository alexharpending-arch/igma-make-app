import { useEffect, useState } from "react"

const A = "/assets"

type Screen = "splash" | "welcome" | "entry" | "signup" | "signin" | "interests" | "profile"

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
}: {
  mode: "signup" | "signin"
  back: () => void
  switchMode: () => void
  next: () => void
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
      {isSignIn && <button className="forgot">Forgot Password?</button>}
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

function Profile({ back }: { back: () => void }) {
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
        <button onClick={() => undefined}>Continue</button>
      </div>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash")

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
      />
    )
  if (screen === "signin")
    return (
      <Auth
        mode="signin"
        back={() => setScreen("entry")}
        switchMode={() => setScreen("signup")}
        next={() => setScreen("interests")}
      />
    )
  if (screen === "interests")
    return (
      <Interests
        back={() => setScreen("signin")}
        next={() => setScreen("profile")}
      />
    )
  return <Profile back={() => setScreen("interests")} />
}
