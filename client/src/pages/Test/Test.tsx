import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

export default function Test() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImplbnBsZTk3MDlAZ21haWwuY29tIiwidXNlcklkIjoiNjU1ZGY1MDBjZTc5Nzc4NTczNmU0MjlhIiwiaWF0IjoxNzAwNjcyODA1LCJleHAiOjE3MDE4ODI0MDV9.Wrs7NdVHR1TYbJfW0-daABRsy54FqFi3qjNLU5r_LWw';

  const uploadSong = async (formData: FormData) => {
    const response = await axios.post('/api/song', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAudioFile(event.target.files[0]);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };
  const mutation = useMutation(uploadSong, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message,
        );
      } else {
        console.error('Error:', error);
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (audioFile && imageFile) {
      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('songImage', imageFile);
      formData.append('songName', 'Test');
      formData.append('songDescription', 'test');
      formData.append('songDuration', '240');
      formData.append('songCategory', '1');

      mutation.mutate(formData);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleAudioChange} />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
