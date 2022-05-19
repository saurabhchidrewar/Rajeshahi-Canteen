import React from "react";
import teamData from "./Teamdata";
import Teamcard from "./Teamcard";
import Layout from "./Layout";
import TeamImg from "./Assets/Images/team.png"

function Team() {

    return (
        <Layout id='teampage'>
            <h1 id="team-heading">The Team
            <img src={TeamImg} alt="team" id="teamImg"/>
            </h1>
            <section id="team">
                {teamData ? teamData.map((element, key) => <Teamcard key={key} name={element.name} role={element.role} git={element.git} linkedin={element.linkedin} email={element.email} image={element.image}/>): <></>}
            </section>
        </Layout>
    );
}

export default Team;