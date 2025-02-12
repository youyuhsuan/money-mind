import { Button, ButtonProps, textDecoration } from "@chakra-ui/react";

interface PillButtonProps extends ButtonProps {
  variant?: "primary" | "secondary";
}

const PillButton = ({
  variant = "secondary",
  children,
  ...props
}: PillButtonProps) => {
  const styles = {
    primary: {
      bg: "#0f0e05",
      color: "white",
      _hover: {
        bg: "gray.800",
      },
      _active: {
        bg: "gray.900",
      },
    },
    secondary: {
      bg: "transparent",
      color: "#0f0e05",
      _hover: {
        textDecoration: "none",
        color: "gray.600",
      },
      _active: {
        color: "gray.800",
      },
      _focus: {
        boxShadow: "none",
      },
    },
  };

  return (
    <Button
      {...props}
      {...styles[variant]}
      borderRadius="full"
      px={8}
      py={6}
      fontSize="md"
      fontWeight="medium"
      gap={3}
      transition="all 0.2s"
      _focus={{
        boxShadow: "none",
      }}
    >
      {children}
    </Button>
  );
};

export default PillButton;
