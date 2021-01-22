import Cookies from "universal-cookie";

const AdminLogout = () => {
    const cookies = new Cookies();
    cookies.remove('token', {path: '/'});
    localStorage.clear();
    window.location.replace('/')
}

export default AdminLogout;
