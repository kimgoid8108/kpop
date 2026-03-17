/**
 * 관리자 API 인증 (x-admin-token)
 * @param {Request} req
 * @returns {boolean}
 */
export function validateAdminToken(req) {
  const token = req.headers.get('x-admin-token');
  const expected = process.env.ADMIN_UPLOAD_TOKEN;
  return Boolean(expected && token === expected);
}
