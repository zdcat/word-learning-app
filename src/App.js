import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { words } from "./data/words";

function App() {
  // 使用useState hook管理当前单词的索引
  // currentIndex: 当前显示的单词在words数组中的位置
  const [currentIndex, setCurrentIndex] = useState(0);

  // 使用useState hook管理是否显示英文
  // showEnglish: 控制是否显示英文单词和词性
  const [showEnglish, setShowEnglish] = useState(false);

  // 使用useState hook管理随机打乱后的单词数组
  const [shuffledWords, setShuffledWords] = useState([]);

  // 在组件加载时随机打乱单词数组
  useEffect(() => {
    // 创建单词数组的副本
    const wordsCopy = [...words];
    // 随机打乱数组
    for (let i = wordsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsCopy[i], wordsCopy[j]] = [wordsCopy[j], wordsCopy[i]];
    }
    setShuffledWords(wordsCopy);
  }, []);

  // 处理上一个单词
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      // 如果是第一个单词，则循环到最后一个
      if (prevIndex === 0) {
        return shuffledWords.length - 1;
      }
      return prevIndex - 1;
    });
    setShowEnglish(false);
  };

  // 处理下一个单词
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledWords.length);
    setShowEnglish(false);
  };

  // 处理展示意思按钮点击
  const handleShowMeaning = () => {
    setShowEnglish(true);
  };

  // 获取当前要显示的单词数据
  const currentWord = shuffledWords[currentIndex];

  // 获取当前中文对应的所有英文单词和词性
  const getRelatedWords = () => {
    return shuffledWords.filter(
      (word) => word.translation === currentWord.translation
    );
  };

  // 如果单词数组还没有准备好，显示加载中
  if (shuffledWords.length === 0) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5">加载中...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    // 使用Material-UI的Container组件作为页面容器
    <Container maxWidth="sm">
      {/* 使用Box组件进行布局，设置上边距和文本居中 */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        {/* 使用Paper组件创建一个卡片式的容器 */}
        <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
          {/* 显示中文翻译 */}
          <Typography variant="h4" component="h1" gutterBottom>
            {currentWord.translation}
          </Typography>
          {/* 条件渲染：当showEnglish为true时显示所有相关的英文和词性 */}
          {showEnglish && (
            <Box>
              {getRelatedWords().map((word, index) => (
                <Typography
                  key={index}
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {word.word} {word.partOfSpeech}
                </Typography>
              ))}
            </Box>
          )}
        </Paper>

        {/* 按钮容器 */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          {/* 上一个按钮 */}
          <Button variant="outlined" color="primary" onClick={handlePrevious}>
            上一个
          </Button>
          {/* 下一个按钮 */}
          <Button variant="outlined" color="primary" onClick={handleNext}>
            下一个
          </Button>
        </Box>

        {/* 展示意思按钮 */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleShowMeaning}
          fullWidth
        >
          展示意思
        </Button>
      </Box>
    </Container>
  );
}

export default App;
