import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Rating, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { UserInfo } from "./FormTablePage";
import { useEffect, useState } from "react";
interface InfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
  defaultName: string;
}
export default function InfoPage({
  open,
  setOpen,
  setCurrentInfo,
  defaultName,
}: InfoProps) {
  const [name, setName] = useState<string>();
  const [gender, setGender] = useState<number>(2.5);
  const [personality, setPersonality] = useState<number>(2.5);
  const [appear, setAppear] = useState<number>(2.5);
  const [interest, setInterest] = useState<number>(2.5);
  const [time, setTime] = useState<number>(12);
  const [sum, setSum] = useState<number>(0);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    formJson.sum = sum;
    setCurrentInfo(formJson as UserInfo);
    setGender(2.5)
    setPersonality(2.5)
    setAppear(2.5)
    setInterest(2.5)
    setTime(12)
    
    handleClose();
  };
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });
  useEffect(() => {
    setSum((appear + interest + personality + gender) / 2);
  }, [appear, gender, interest, personality]);
  useEffect(() => {
    setName(defaultName)
  },[defaultName])
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>填写人员信息</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <Typography>
            🥰想象一下你crush的理想型，然后填写这个人与其符合程度，尽量客观哦~
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              defaultValue={defaultName}
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
              margin="dense"
              id="name"
              name="name"
              label="ta的名字"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              defaultValue={defaultName}
              value={time}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const inputValue = event.target.value;

                // 只允许输入数字（含可选小数点）
                if (/^\d*\.?\d*$/.test(inputValue)) {
                  setTime(Number(inputValue));
                }
              }}
              margin="dense"
              id="time"
              name="time"
              label="相识时长（月）"
              fullWidth
              variant="standard"
            />
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Typography component="legend">ta的性别</Typography>
              <StyledRating
                name="gender"
                value={gender}
                defaultValue={2.5}
                getLabelText={(value: number) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setGender(newValue);
                  }
                }}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Box>
                <Typography component="legend">ta的外形</Typography>
              </Box>

              <StyledRating
                name="appear"
                value={appear}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setAppear(newValue);
                  }
                }}
                defaultValue={2.5}
                getLabelText={(value: number) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Typography component="legend">ta的性格</Typography>
              <StyledRating
                name="personality"
                value={personality}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setPersonality(newValue);
                  }
                }}
                defaultValue={2.5}
                getLabelText={(value: number) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Typography component="legend">ta的喜好</Typography>
              <StyledRating
                name="interest"
                value={interest}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setInterest(newValue);
                  }
                }}
                defaultValue={2.5}
                getLabelText={(value: number) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
            <Typography>ta的总分是{sum}分</Typography>
            <DialogActions>
              <Button onClick={handleClose}>取消</Button>
              <Button type="submit">确定</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
