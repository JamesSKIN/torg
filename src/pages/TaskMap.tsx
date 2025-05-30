import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { RootState } from '../store/store';
import { TaskMapNode } from '../types/task';

const TaskMap: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [nodes, setNodes] = useState<TaskMapNode[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>('');

  const handleAddNode = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask('');
  };

  const handleCreateNode = () => {
    if (selectedTask) {
      const task = tasks.find((t) => t.id === selectedTask);
      if (task) {
        const newNode: TaskMapNode = {
          id: `node-${nodes.length + 1}`,
          taskId: task.id,
          position: {
            x: Math.random() * 500,
            y: Math.random() * 500,
          },
          connectedTo: [],
        };
        setNodes([...nodes, newNode]);
      }
    }
    handleCloseDialog();
  };

  const handleConnectNodes = (sourceId: string, targetId: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === sourceId && !node.connectedTo.includes(targetId)) {
          return {
            ...node,
            connectedTo: [...node.connectedTo, targetId],
          };
        }
        return node;
      })
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Task Map</Typography>
        <IconButton onClick={handleAddNode} color="primary">
          <AddIcon />
        </IconButton>
      </Box>

      <Paper
        sx={{
          height: '600px',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#f5f5f5',
        }}
      >
        {nodes.map((node) => {
          const task = tasks.find((t) => t.id === node.taskId);
          return (
            <Box
              key={node.id}
              sx={{
                position: 'absolute',
                left: node.position.x,
                top: node.position.y,
                bgcolor: 'white',
                p: 2,
                borderRadius: 1,
                boxShadow: 2,
                minWidth: '200px',
                cursor: 'move',
              }}
            >
              <Typography variant="subtitle1">{task?.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {task?.category}
              </Typography>
              {node.connectedTo.map((targetId) => {
                const targetNode = nodes.find((n) => n.id === targetId);
                if (targetNode) {
                  return (
                    <Box
                      key={targetId}
                      sx={{
                        position: 'absolute',
                        left: targetNode.position.x - node.position.x,
                        top: targetNode.position.y - node.position.y,
                        width: '2px',
                        height: '2px',
                        bgcolor: 'primary.main',
                      }}
                    />
                  );
                }
                return null;
              })}
            </Box>
          );
        })}
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Task to Map</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Task</InputLabel>
            <Select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
            >
              {tasks.map((task) => (
                <MenuItem key={task.id} value={task.id}>
                  {task.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateNode} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskMap; 