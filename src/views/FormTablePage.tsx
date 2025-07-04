import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import "./FormTablePage.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import InfoPage from "./InfoPage";
export interface UserInfo {
  name: string;
  time: number;
  gender: number;
  personality: number;
  appear: number;
  interest: number;
  sum: number;
}
interface result {
  name: string | null;
  score: number;
}
export default function FormTable() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [infoList, setInfoList] = useState<UserInfo[]>([]);
  const [currentInfo, setCurrentInfo] = useState<UserInfo>();
  const [defaultName, setDefaultName] = useState<string>("User0");
  const [resultList, setResultList] = useState<result[]>([]);
  useEffect(() => {
    if (currentInfo !== undefined) {
      setInfoList((prevList) => [...prevList, currentInfo]);
    }
  }, [currentInfo]);
  useEffect(() => {
    setDefaultName("User" + infoList.length);
  }, [infoList.length]);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  function calculateProbabilities(
    infoList: UserInfo[],
    lambda = 0.3
  ): { name: string | null; score: number }[] {
    // Step 1: 计算亲密度增强因子 s_i = 1 - e^(-λ * time)
    const timeFactors = infoList.map(
      (user) => 1 - Math.exp(-lambda * user.time)
    );

    // Step 2: 加权亲密度 = sum * timeFactor
    const weightedScores = infoList.map((user, i) => user.sum * timeFactors[i]);

    // Step 3: softmax 归一化
    const expScores = weightedScores.map((score) => Math.exp(score));
    const expSum = expScores.reduce((acc, val) => acc + val, 0);
    const probabilities = expScores.map((score) => score / expSum);

    // 输出结果
    return infoList.map((user, i) => ({
      name: user.name,
      score: parseFloat(probabilities[i].toFixed(4)),
    }));
  }
  const handleCalculate = () => {
    if (infoList.length > 0) {
      setResultList(calculateProbabilities(infoList));
    }
  };
  return (
    <Box
      className="bcground"
      sx={{ background: "linear-gradient(to bottom, #fce9ef, #ffffff)" }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: 30,
          fontWeight: 600,
        }}
      >
        🤓👆情感倾向评估系统
      </Typography>
      <Paper variant="outlined" sx={{ padding: "24px", marginTop: "12px" }}>
        <Stack>
          <Box>
            <Typography>😇本系统使用简单的概率论知识，来算算你的crush喜欢你的概率有多大吧！</Typography>
            <Typography
              sx={{
                color: "gray",
                fontStyle: "italic",
              }}
            >
              使用说明：<br></br>
              1. 回想一下你的 crush可能接触的对象，并填写他们的相关信息。 <br></br>
              2.即使你不确定具体是谁，也没关系，可以根据你的判断估算crush接触的对象数量（包括你自己），每个人的信息尽量填写中性的平均值。<br></br>
              3. 请尽量客观填写每项内容。 <br></br>
              4. 填写完毕后，点击「计算」按钮。<br></br>
              5. 本系统仅供娱乐参考，结果并不代表真实情况，作者不承担任何责任。
            </Typography>
          </Box>
          <Stack spacing={1}>
            {infoList.map((item) => {
              return (
                <Paper
                  variant="outlined"
                  key={item.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "12px",
                  }}
                >
                  <Typography>姓名：{item.name}</Typography>
                  <Typography>分数：{item.sum}</Typography>
                </Paper>
              );
            })}
          </Stack>

          <Box>
            <IconButton onClick={handleClickOpen}>
              <AddCircleIcon></AddCircleIcon>
            </IconButton>
            <label>👈添加人员</label>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" size="large" onClick={handleCalculate}>
              计算！计算！计算！
            </Button>
          </Box>
          {resultList?.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>姓名</TableCell>
                      <TableCell>概率</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resultList.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.score * 100}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <></>
          )}
        </Stack>
      </Paper>
      <InfoPage
        open={dialogOpen}
        setOpen={setDialogOpen}
        setCurrentInfo={setCurrentInfo}
        defaultName={defaultName}
      ></InfoPage>
    </Box>
  );
}
