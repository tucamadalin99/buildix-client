import { motion } from "framer-motion";

const ConnectorLine = ({ isVertical }: { isVertical: boolean }) => (
  <motion.div
    initial={{ [isVertical ? "height" : "width"]: 0 }}
    animate={{ [isVertical ? "height" : "width"]: isVertical ? 40 : 80 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={isVertical ? "w-px bg-primary -mb-10" : "h-1 bg-primary -mr-10"}
  />
);

export default ConnectorLine;
