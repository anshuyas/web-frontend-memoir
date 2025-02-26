const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async () => {
      try {
        const response = await axios.post("/api/admin/login", { email, password });
        localStorage.setItem("token", response.data.token);
        window.location.href = "/admin-dashboard";
      } catch (error) {
        alert("Invalid credentials");
      }
    };
  
    return (
      <div>
        <h1>Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };