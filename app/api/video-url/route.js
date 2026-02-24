import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// JS 파일에서는 타입, ! 제거해야 함. env 값도 널체크 필요
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId") || "testcourse";

    // 환경변수 널 체크
    const endpoint = process.env.R2_ENDPOINT;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    // 오타 주의: .env.local에 SECRET-ACCESS-KEY → SECRET_ACCESS_KEY로 고칠 것 (env에서 - 인식 안 됨)
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucket = process.env.R2_BUCKET;

    if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) {
      console.error("R2 환경변수 누락", {
        endpoint,
        accessKeyId,
        secretAccessKey,
        bucket,
      });
      return new Response("R2 환경변수가 누락되었습니다.", { status: 500 });
    }

    const client = new S3Client({
      region: "auto",
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: `courses/${courseId}/source.mp4`,
    });

    const signedUrl = await getSignedUrl(client, command, {
      expiresIn: 60 * 60, // 1시간
    });

    // Response.json은 최신 next에서 global Response 객체가 지원해야 함 (지원 안 하면 다음 주석 참고)
    if (typeof Response.json === "function") {
      return Response.json({ signedUrl });
    } else {
      return new Response(JSON.stringify({ signedUrl }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.error(err);
    return new Response("Failed to generate video URL", { status: 500 });
  }
}
