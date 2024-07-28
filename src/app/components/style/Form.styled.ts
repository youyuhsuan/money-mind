"use client";

import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 200;
  font-size: 0.6rem;
  margin-bottom: 0.2rem;
  color: #4a5568;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
  &::placeholder {
    color: #a0aec0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: ##b19693;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ##b19693;
  }
`;

const ErrorMessage = styled.p`
  color: #b5495b;
  font-size: 12px;
  margin-top: 5px;
`;

const SuccessMessage = styled.p`
  color: #b5caa0;
  font-size: 12px;
  margin-top: 5px;
`;

export { Form, Label, Input, Select, Button, ErrorMessage, SuccessMessage };
