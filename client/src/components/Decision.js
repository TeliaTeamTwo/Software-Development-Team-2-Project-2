import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Decision = () => {

    

    return (
    <Fragment>
    <section>
        <h1>Jargon Moment</h1>
        <h2>What kind of profile do you want to set up?</h2>
          <form>
            <input type="radio" id="companyForm" name="companyForm" value="companyUser"></input>
                  <label for="companForm"> Company user profile </label><br></br>

            <input type="radio" id="privateUserForm" name="privateUserForm" value="privateUser"></input>
                  <label for="privateUserForm"> Private user profile </label><br></br>

        <input type='submit' value='Accept'/>
          </form>
    </section>
    </Fragment>
    );
};

export default Decision;