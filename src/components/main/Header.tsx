// NodeJS, TypeScript, TanStack-Query
import {Fragment, useState, useRef, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {AxiosResponse, AxiosError} from "axios";

function Header() {
    const nav = useNavigate();
    const [login, setLogin] = useState<boolean>(false);
    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const idRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement>(null)
    // sessionStorage
    /*
         서버에서 session저장 안된다
         -------------------------  DB
         세션 저장 : sessionStorage.=setItem("키","값") > 서버로 id,pwd 전송 => 결과값
         세션 해제 : sessionStorage.clear()

         // 댓글

     */
    interface LoginData {
        msg: string;
        id: string;
        name: string;
    }
    // useQuery => 함수명 지정: refetch: 함수명
    const {mutate: loginOK} = useMutation({
        mutationFn: async () => {
            const res: AxiosResponse<LoginData> = await  apiClient.get(`/member/login/${id}/${pwd}`)
            return res.data
        },
        onSuccess: (data) => {
            if(data.msg === 'NOID')
            {
                alert("아이디를 확인 해주세요.")
                setId('');
                setPwd('');
                idRef.current?.focus();
            }
            else if(data.msg === 'NOPWD')
            {
                alert("비밀번호를 확인 해주세요.")
                setPwd('');
                pwdRef.current?.focus();
            }
            else if(data.msg === 'OK')
            {
                // session 저장 => 자바스크립트
                window.sessionStorage.setItem("id", data.id);
                window.sessionStorage.setItem("name", data.name);
                setLogin(true)
                window.location.reload();
            }
        },
        onError: (err: AxiosError) => {
            console.log("Login Err", err.message);
        }
    });
    ////////////////////////////////// 서버 연결
    useEffect(() => {
        if(sessionStorage.getItem("id"))
        {
            setLogin(true)
        }
    }, []);
    const memberLogin = () => {
        if(id.trim() === "")
        {
            idRef.current?.focus();
            return
        }
        if(pwd.trim() === "")
        {
            pwdRef.current?.focus();
            return
        }
        loginOK()
    }
    const memberLogout = () => {
        window.sessionStorage.clear(); // session.invalidate()
        setId('');
        setPwd('');
        setLogin(false);
        window.location.reload();
    }
    return (
        <Fragment>
            <div className="top_header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-5 col-sm-6">
                        </div>
                        <div className="col-7 col-sm-6">
                            <div className="signup-search-area d-flex align-items-center justify-content-end">
                                <div className="login_register_area d-flex">
                                    {
                                        !login?(
                                            <div className="login">
                                                ID:<input type={"text"} size={10} className={"input-sm"}
                                                          onChange={(e: any) => setId(e.target.value)}
                                                          ref={idRef}
                                                          value={id}/>&nbsp;
                                                PW:<input type={"password"} size={10} className={"input-sm"}
                                                          onChange={(e: any) => setPwd(e.target.value)}
                                                          ref={pwdRef}
                                                          value={pwd}/>&nbsp;
                                                <button className={"btn-sm btn-outline-primary"} onClick={memberLogin}>로그인</button>
                                            </div>
                                        ): (
                                            <div className="login">
                                                {window.sessionStorage.getItem("name")}님 로그인 중입니다.&nbsp;
                                                <button className={"btn-sm btn-outline-danger"} onClick={memberLogout}>로그아웃</button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=""
                    style={{backgroundImage:"url(./img.png)",
                        backgroundSize: "100% 100%",
                        width: "100%",
                        height: "650px",
            }}>
                            <div className="logo_area text-center">
                                <Link to="/" className="yummy-logo" style={{color:"aliceblue", padding:"180px"}}>Books</Link>
                            </div>
                <nav className="navbar" style={{
                    padding: "10px 0"
                }}>
                    <ul className={"nav-ul"}>
                        <li>
                            <Link className="nav-link" to={"/book/list"}>
                                <h4>BAR List</h4>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to={"/board/list"}>
                                <h4>Community</h4>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to={"news/list"}>
                                <h4>NEWS</h4>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    marginBottom: "30px"
                }}>
                    <div style={{ display: "flex", gap: "6px", width: "300px" }}>
                        <input
                            type="text"
                            placeholder="검색어 입력"
                            /*value={query}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}*/
                            style={{
                                flex: 1,
                                padding: "6px 10px",
                                fontSize: "14px",
                                border: "1px solid #ccc",
                                borderRadius: "15px"
                            }}
                        />
                        <button
                            /*onClick={handleSearch}*/
                            style={{
                                padding: "6px 12px",
                                fontSize: "14px",
                                border: "none",
                                backgroundColor: "whitesmoke",
                                color: "black",
                                borderRadius: "15px",
                                cursor: "pointer"
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Header;