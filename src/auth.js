export function isAuthenticated(user) {
  return !!user;
}

export function hasRole(user, role) {
  return user?.roles?.includes(role);
}

export function isMe(user, userId) {
  return user?.id === userId;
}
