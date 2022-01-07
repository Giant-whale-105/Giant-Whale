import axios from "axios";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import CompanyLogo from '../assets/img/CompanyLogo.png'

const SignUp = () => {
  const history = useHistory()
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupdata = {
    username,
    email,
    password,
  };

  //   console.log(signupdata);
  const handleSignup = (e) => {
    if (!username || !email | !password) {
      //return toast.warning("Fill the details")
    }
    else {
      axios
        .post("http://localhost:5050/signup", signupdata)
        .then((result) => {
          // console.log(result);
        });
      toast.success("Success SignUp")
      history.push('/')
    };
  }
  return (
      <main>
      
        <div class="container">

        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div class="d-flex justify-content-center py-4">
                  <a href="index.html" class="logo d-flex align-items-center w-auto">
                    <img src={CompanyLogo} alt="" />
                    {/* <span class="d-none d-lg-block">NiceAdmin</span> */}
                  </a>
                </div> {/* <!-- End Logo --> */}

                <div class="card mb-3">

                  <div class="card-body">

                    <div class="pt-2 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                      {/* <p class="text-center small">Enter your personal details to create account</p> */}
                    </div>

                    <form class="row g-3 needs-validation" novalidate >
                      <div class="col-12">
                        <label for="yourName" class="form-label">Your Name</label>
                        <input type="text" name="name" class="form-control" id="yourName"
                                onChange={(e) => { setUserName(e.target.value); }} required />
                        <div class="invalid-feedback">Please, enter your name!</div>
                      </div>

                      <div class="col-12">
                      <label for="yourEmail" class="form-label">Your Email</label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" name="username" class="form-control" id="yourUsername" 
                                  onChange={(e) => { setEmail(e.target.value); }} required />
                          <div class="invalid-feedback">Please choose a username.</div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourPassword" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" id="yourPassword"
                                onChange={(e) => { setPassword(e.target.value); }} required />
                        <div class="invalid-feedback">Please enter your password!</div>
                      </div>

                      <div class="col-12">
                        <button class="btn btn-primary w-100" onClick={handleSignup} >Create Account</button>
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">Already have an account? <a href="/">Log in</a></p>
                      </div>
                    </form>

                  </div>
                </div>

                <div class="credits">
                  {/* <!-- All the links in the footer should remain intact. -->
                  <!-- You can delete the links only if you purchased the pro version. -->
                  <!-- Licensing information: https://bootstrapmade.com/license/ -->
                  <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ --> */}
                  Designed by Rahul Bhayani
                </div>

              </div>
            </div>
          </div>

        </section>

        </div>

      </main> // <!-- End #main -->

  );
};

export default SignUp;
