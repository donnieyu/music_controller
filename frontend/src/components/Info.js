import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton, TextField } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function Info(props) {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return <Grid container alignItems="center">
      <Grid container justifyContent="center">
        <Grid item xs={6} style={{}}>
          <Typography component="h6" variant="h6" style={{marginBottom: "10px"}}>
            <b>컴퓨터프로젝트 개요</b>
          </Typography>
          <Typography align="left" variant="body1" style={{marginBottom: "7px"}}>
            <b>사용기술</b>
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            프론트엔드 개발자로써 요즘 대세 언어인 Python을 활용하고 Python을 기반으로 개발이된 DjangoDB를 활용하여 데이터를 저장 및 API 개발을 하였습니다.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            Python 서버와 DjangoDB의 ViewAPI, DataModel을 사용하였고, 프론트엔드는 React를 사용하고 UI tool로는 Material UI를 사용하였습니다. 
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            <fieldset style={{borderRadius: "8px"}}>
              <legend>Git Source</legend>
              <a href="https://github.com/donnieyu/music_controller">Music Controller(House Party)</a>
            </fieldset>
            <fieldset style={{borderRadius: "8px"}}>
              <legend>Reference</legend>
              <a href="https://youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j">YouTube reference by Tech with Tim</a>
            </fieldset>
          </Typography>
          <Typography align="left" variant="body1" style={{marginBottom: "7px"}}>
            <b>서비스 기획</b>
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            백그라운드 음악이 틀어져있는 음식점이나 클럽과 같은 장소에 있는 사람들은 지금 듣고 있는 음악이 마음에 들지 않아도 음악을 틀어주는 사장님께 음악 변경을 요청하거나 다음 곡 실행을 할 수 있는 방법이 없습니다.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            제가 만든 앱을 사용하여 음식점이나 클럽의 사장님이 음악 방을 하나 만들면 현재 실행 중인 음악에 대한 정보가 노출되고 음악 실행에 대한 권한을 방에 접근한 사용자에게 제공할 수 있습니다.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            다음 음악을 듣고 싶은 사용자의 투표를 받아 일정 투표수가 넘어가면 음악이 다음 음악으로 넘어가는 기능을 제공합니다.
          </Typography>
          <Typography align="left" variant="body1" style={{marginBottom: "7px"}}>
            <b>참고 프로젝트 대비 우수한 점</b>
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            1. 주최자는 본인의 방에 무조건 들어가게 되며 다른 방으로 이동하기 위해선 본인의 방을 삭제해야함.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "10px"}}>
            <b>-&gt; 주최자가 다른 방의 참가자가 될 수 있도록 다른 주최자들이 생성한 모든 방의 리스트를 Room List 화면에서 보이도록 개선함.</b>
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            2. 방 생성 및 코드를 이용한 방 접근이 페이지 이동을 통해 진행됨.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "10px"}}>
            <b>-&gt; 모달 컴포넌트를 활용하여 페이지 이동 없이 한 화면에서 생성 및 접근을 바로 할 수 있도록 개선함.</b>
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            3. Room List 화면이 없음.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "10px"}}>
            <b>-&gt; Room List 화면을 통해 각각의 방에서 실행되고 있는 음악이 무엇인지 알 수 있으며, 해당 방으로 들어갈 수 있고 삭제도 가능함.</b>
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            4. Room List 화면이 없음.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "10px"}}>
            <b>-&gt; Room List 화면을 통해 각각의 방에서 실행되고 있는 음악이 무엇인지 알 수 있으며, 해당 방으로 들어갈 수 있고 삭제도 가능함.</b>
          </Typography>
          <Typography align="left" variant="body1" style={{marginBottom: "7px"}}>
            <b>향후 가치 및 개선할 점</b>
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            Python의 Django를 활용하면 간단명료하게 Python 언어로 DataBase를 생성하고 Modeling을 할 수 있는 장점이 있습니다. 
            이것을 활용하여 주최자가 생성한 방과 그 실행 음악의 종류를 데이터 베이스화 하여 생성된 방에 재생된 음악의 종류를 방 참가자에게 제공하는 개선을 진행하려 합니다.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "17px"}}>
            또한 어플리케이션 사용자의 가입 시스템을 도입하여 웹세션으로 관리를 하는 사용자 정보를 더욱 체계화 하는 개선점이 남아있습니다.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "12px"}}>
            그리고 Spotify에 사용자가 로그인하고 로그인한 정보를 어플리케이션의 웹으로 전달할 때 사용되는 OAuth2.0 인증 방식에 대한 이해가 많이 부족한 것을 느꼈고 Spotify에서 제공하는 문서의 내용을 자세하게 살펴보아 사용자 인증을 더욱 쉽게 할 수 있는 방법을 개선점으로 생각하고 있습니다.
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            하나의 방에 참여하고 있는 사용자들의 리스트를 보여주고 채팅 기능을 추후 보완 기능으로 생각하고 있습니다.
          </Typography>
          <Typography align="left" variant="body1" style={{marginBottom: "7px"}}>
            <b>Library list and versions</b>
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            React (18.0.0)
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            React Router (5.3.0))
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "7px"}}>
            Python (3.10.4)
          </Typography>
          <Typography align="left" variant="body2" style={{marginBottom: "20px"}}>
            Django (4.0.3)
          </Typography>
          <Typography align="left" variant="body1" style={{marginBottom: "7px"}}>
            <b>감사합니다.</b>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  }

  function createInfo() {
    return "Create page";
  }

  useEffect(() => {
    console.log("ran");
    return () => console.log("cleanup");
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          About this website.
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
