"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main>
        <h1>안뇽~</h1>
        <p>시작해볼까나~1?.</p>
        <p>commit test</p>
      </main>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/educators/instructor-register">
            Educator 강사 회원가입
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/educators/assistant-register">
            Educator 조교 회원가입
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/educators/login">Educator 로그인</Link>
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/learners/register">Learner 회원가입</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/learners/login">Learner 로그인</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
