import { useState } from 'react';
import { Box, Checkbox, Flex, Heading, Text, VStack, Input, Button } from '@chakra-ui/react';
import { FaTrophy, FaRocket, FaMagic } from 'react-icons/fa';

const Index = () => {
  const [goals, setGoals] = useState([
    { id: 1, text: '30 minutes of running', points: 50, completed: false },
    { id: 2, text: '15 minutes of meditation', points: 30, completed: false },
    { id: 3, text: 'Drink 2 liters of water', points: 20, completed: false }
  ]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [newExercise, setNewExercise] = useState('');
  const [newPoints, setNewPoints] = useState(0);

  const handleCheckboxChange = (id) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === id) {
        if (!goal.completed) {
          setTotalPoints(totalPoints + goal.points);
        } else {
          setTotalPoints(totalPoints - goal.points);
        }
        return { ...goal, completed: !goal.completed };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  const addExercise = () => {
    const newId = goals.length + 1;
    const newGoal = { id: newId, text: newExercise, points: parseInt(newPoints, 10), completed: false };
    setGoals([...goals, newGoal]);
    setNewExercise('');
    setNewPoints(0);
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Daily Fitness Goals</Heading>
      <VStack spacing={4}>
        {goals.map(goal => (
          <Checkbox key={goal.id} isChecked={goal.completed} onChange={() => handleCheckboxChange(goal.id)}>
            {goal.text} (+{goal.points} points)
          </Checkbox>
        ))}
      </VStack>
      <Box mt={5}>
        <Input placeholder="Enter new exercise" value={newExercise} onChange={(e) => setNewExercise(e.target.value)} />
        <Input placeholder="Enter points" type="number" value={newPoints} onChange={(e) => setNewPoints(e.target.value)} />
        <Button onClick={addExercise} mt={2}>Add Exercise</Button>
      </Box>
      <Flex mt={10} justifyContent="center">
        <Text fontSize="2xl">
          Total Points: {totalPoints} {totalPoints >= 100 ? <FaMagic /> : totalPoints >= 50 ? <FaRocket /> : totalPoints >= 20 ? <FaTrophy /> : null}
        </Text>
      </Flex>
    </Box>
  );
};

export default Index;