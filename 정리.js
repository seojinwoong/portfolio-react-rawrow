const idHandler = useCallback((e) => {
  setMemberId(e.target.value);
}, []);

const pwdHandler = useCallback((e) => {
  setMemberPwd(e.target.value);
}, []);

const pwdHandler2 = useCallback((e) => {
  setMemberPwd2(e.target.value);
}, []);

const nameHandler = useCallback((e) => {
  setMemberName(e.target.value);
}, []);

const addressHandler = useCallback((e) => {
  setMemberAddress(e.target.value);
}, []);

const phoneSelectHandler = useCallback((e) => {
  setPhone1(e.target.value);
}, []);

const emailHandler = useCallback((e) => {
  setMemberEmail(e.target.value);
}, []);

const genderHandler = useCallback((e) => {
  setMemberGender(e.target.value);
}, []);
