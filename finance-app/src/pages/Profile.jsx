import { useEffect, useState } from "react";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    profession: "",
    photo: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/profile/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(r => r.json())
      .then(data => setForm(data));
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    await fetch("http://localhost:5000/api/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(form)
    });
    alert("Profile Updated");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="avatar-section">
          <div className="avatar-box">
            {form.photo ? (
              <img src={form.photo} alt="profile" />
            ) : (
              <span>No Photo</span>
            )}
          </div>

          <label className="upload-btn">
            Change Photo
            <input type="file" hidden onChange={handleImage} />
          </label>
        </div>

        <div className="profile-form">
          <div className="field">
            <label>Name</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Age</label>
            <input
              value={form.age}
              onChange={e => setForm({ ...form, age: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Profession</label>
            <input
              value={form.profession}
              onChange={e =>
                setForm({ ...form, profession: e.target.value })
              }
            />
          </div>

          <button className="btn primary-btn" onClick={save}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
