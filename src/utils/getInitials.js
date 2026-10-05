// Builds the avatar initials, e.g. ("Jesus", "Ceballos") -> "JC".
export const getInitials = (name, lastName) => {
    const first = name?.trim().charAt(0) ?? ''
    const second = lastName?.trim().charAt(0) ?? ''
    return (first + second).toUpperCase()
}
