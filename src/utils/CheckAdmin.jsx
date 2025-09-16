export const checkForAdmin = (roles) => {
    let check = false;
    for (let i = 0; i < roles.length; i++) {
        const item = roles[i];
        if (item.name === 'super-admin' || item.name === "admin") {
            check = true;
            break;
        }
    }

    return check
}