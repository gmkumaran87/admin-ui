import { useGlobalContext } from "../context/Context";

const editUser = (id) => {
    //    const { editUser } = useGlobalContext();
    let user = { id: "", name: "", email: "", role: "" };

    const handleClick = (e, id) => {
        e.preventDefault();
        console.log(e);
        user = updateUser(id);
    };

    const nameEl = document.getElementById(`rowName-${id}`);
    const emailEl = document.getElementById(`rowEmail-${id}`);
    const roleEl = document.getElementById(`rowRole-${id}`);
    console.log(`object`, nameEl.innerText);

    const inpNameEl = `<input type='text'  class='editInput' name='nameEdit' id='nameEdit-${id}' value='${nameEl.innerText}'>`;

    const inpEmailEl = `<input type='text' class='editInput' name='emailEdit' id='emailEdit-${id}' value="${emailEl.innerText}" >`;
    const inpRoleEl = `<input type='text' class='editInput' name='roleEdit' id='roleEdit-${id}' value="${roleEl.innerText}" >`;
    const submitBtn = `<button type='button' class='submit-btn btn' id='editSubmit'>S</button>`;

    nameEl.innerHTML = inpNameEl;
    emailEl.innerHTML = inpEmailEl;
    roleEl.innerHTML = inpRoleEl + submitBtn;

    const newVal = document.querySelectorAll(`.editInput`);

    const btn = document
        .getElementById("editSubmit")
        .addEventListener("click", (e) => handleClick(e, id));

    console.log("After Even Listener", user);

    const updateUser = (id) => {
        let newUser = { id: "", name: "", email: "", role: "" };

        const [newName, newEmail, newRole] = [
            document.getElementById(`nameEdit-${id}`).value,
            document.getElementById(`emailEdit-${id}`).value,
            document.getElementById(`roleEdit-${id}`).value,
        ];
        newUser["name"] = newName;
        newUser["email"] = newEmail;
        newUser["role"] = newRole;
        newUser["id"] = id;

        const nameEl = document.getElementById(`rowName-${id}`);
        const emailEl = document.getElementById(`rowEmail-${id}`);
        const roleEl = document.getElementById(`rowRole-${id}`);

        nameEl.innerHTML = newName;
        emailEl.innerHTML = newEmail;
        roleEl.innerHTML = newRole;
        console.log(newUser);
        return newUser;
    };

    console.log(user);
    return user;
};

export default editUser;