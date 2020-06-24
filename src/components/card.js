import React from "react"
import moment from "moment/moment"
import NumberFormat from "react-number-format"

const Card = props => (
  // <div
  //   style={{
  //     // background: "#f1faee",
  //     border: "3px solid #eaeaea",
  //     // transition: "box-shadow 500ms ease-in-out 500ms",
  //     boxShadow: "0 0 25px 0px rgba(0, 0, 0, 0.2)",
  //     // boxShadow:'2px 2px 5px grey',
  //     padding: "20px",
  //     marginBottom: "10px",
  //     // borderRadius:'10px'
  //   }}
  // >
  //   <a href={props.href}>
  //     <h1
  //       style={{
  //         fontWeight: "700",
  //         color: "#000",
  //         fontSize: "1.4rem",
  //       }}
  //     >
  //
  //     </h1>
  //   </a>
  //   <p
  //     style={{
  //       color: "grey",
  //       fontSize: "16px",
  //       lineHeight: "1.2",
  //       marginTop: "8px",
  //     }}
  //   >
  //     {moment(props.date).format(`MMMM D, YYYY`)}
  //   </p>
  //   <p>
  //     {props.content}
  //     <br />
  //     {props.minSal} - {props.maxSal}
  //   </p>
  // </div>
  <div className="card">
    <div className="content">
      <span className="category">{props.agency}</span>
      <span className="options">
        <i className="fa fa-ellipsis-v"></i>
      </span>
      <h1>{props.title}</h1>
      <p>
        <strong>Pay Range</strong>
        <br />${props.minHour}-${props.maxHour} per hour
        <br />
        <NumberFormat
          value={props.minSal}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
        -
        <NumberFormat
          value={props.maxSal}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />{" "}
        per year
      </p>
      <p>
        <strong>Location</strong>
        <br />
        {props.location}
      </p>
      {/* <span className="reads"> */}
      <p>
        <strong>Recruiter</strong> <br />
        <span className="">
          <i className="fa fa-user-o"></i> &nbsp;{props.recruiter}
        </span>
      </p>
    </div>
    <div className="dates">
      <p>
        Posted {moment(props.postDate).format(`MMMM D, YYYY`)}
      <br/>
      Closing {moment(props.closeDate).format(`MMMM D, YYYY`)}</p>
    </div>
    <div className="bid">
      <a href={props.href}>APPLY FOR JOB</a>
    </div>
  </div>
)

export default Card
