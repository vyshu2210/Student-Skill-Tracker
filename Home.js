function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to Skill Tracker</h1>
      <p className="subtitle">Track, analyze, and improve your technical skills every day</p>

      <div className="box-wrapper">
        <div className="info-box">
          <h3>Daily Logging</h3>
          <p>Input how much time you spend on each skill throughout the week.</p>
        </div>
        <div className="info-box">
          <h3>Progress Charts</h3>
          <p>Visualize your weekly growth using interactive bar charts.</p>
        </div>
        <div className="info-box">
          <h3>Simple & Fast</h3>
          <p>Minimalistic design with fast navigation and easy inputs.</p>
        </div>
      </div>

      <div className="login-links">
        <a href="/login">Login</a> |
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Home;