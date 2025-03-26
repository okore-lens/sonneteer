import * as React from "react";
import { Eye, Megaphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import useMediaQuery from "@/hooks/use-media-query";

import Markdown from "./markdown";

type ArticlePreviewProps = {
  title: string;
  content: string;
  publishArticle: () => void;
};

const ArticlePreview = ({
  content,
  title,
  publishArticle,
}: ArticlePreviewProps) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog
        data-testid="article-preview-dialog"
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button variant="outline">
            <Eye className="size-4 mr-2" />
            Preview
          </Button>
        </DialogTrigger>
        <DialogContent
          aria-describedby={undefined}
          className="sm:max-w-3xl max-h-[80vh] flex flex-col"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl xl:!text-4xl">{title}</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto mt-2">
            <Markdown content={content} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Dismiss</Button>
            </DialogClose>
            <Button onClick={publishArticle}>
              <Megaphone className="size-4 mr-2" />
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Eye className="size-4 mr-2" />
          Preview
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined} className="">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl xl:!text-4xl">{title}</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4">
          <Markdown content={content} />
        </div>
        <DrawerFooter className="pt-2 mt-2 flex-row justify-end">
          <DrawerClose asChild>
            <Button variant="outline">Dismiss</Button>
          </DrawerClose>
          <Button onClick={publishArticle}>
            <Megaphone className="size-4 mr-2" />
            Publish
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ArticlePreview;
