import { Giscus } from '@/components/common/comment/giscus';
import Intro from '@/components/MDX/intro';
import Link from '@/components/MDX/link';
import PageHeading from '@/components/page-heading';

export default function Talk() {
  return (
    <div>
      <main className="min-w-0 isolate">
        <article key="ht-talk" className="font-normal break-words text-primary dark:text-primary-dark">
          <div className="ps-0">
            <div className="mx-auto px-0 lg:px-4 max-w-5xl">
              <PageHeading title="Lời tâm sự" />
            </div>
            <div className="px-5 sm:px-12">
              <div className="max-w-7xl mx-auto lg:flex lg:flex-col lg:items-center">
                <div className="max-w-4xl ms-0 2xl:mx-auto">
                  <p className="whitespace-pre-wrap my-4">July 31, 2025</p>

                  <hr className="my-6 block border-b border-t-0 border-border dark:border-border-dark" />

                  <Intro>
                    Chúc Thảo có một ngày mới thật là vui nhé! Anh đã suy nghĩ rất nhiều để viết ra mấy dòng này. Đây là
                    lời thật lòng của anh chứ không phải đoạn văn mẫu mà anh đã dùng ChatGPT chỉnh sửa hôm chủ nhật đâu.
                  </Intro>
                  <p className="whitespace-pre-wrap my-4">
                    Từ lúc nhận tin nhắn của em tới giờ, cảm giác khó chịu có cứ bám lấy anh hoài. Nó y như cái cảm giác
                    hồi cấp 3 mà anh từng kể với em – bồn chồn, tim đập nhanh. Anh cảm giác như mình dần quay lại con
                    người trước 2024: ít nói, mất tự tin, chỉ muốn làm gì đó thật nhanh để rồi lánh vào phòng. Đến cả
                    cầu lông, thứ anh thích – anh cũng chẳng muốn chơi.
                  </p>
                  <p className="whitespace-pre-wrap my-4">
                    Anh biết, việc nhắn tin và gọi điện liên tục chắc chắn ảnh hưởng đến việc học của em, rồi gia đình
                    em cũng không vui. Anh nhận ra điều đó chứ. Nhưng vì sự ích kỷ của bản thân, vì thiếu đi người tâm
                    sự, anh đã lờ đi và vẫn cố tìm mọi cách nói chuyện với em.
                  </p>
                  <p className="whitespace-pre-wrap my-4">
                    <b>ANH THẬT SỰ XIN LỖI EM</b>. Chắc gia đình em đã la mắng em nhiều nhiều lắm. Khoảng cách 11 tuổi
                    vốn đã là điều vô lý ngay từ đầu. Đôi khi trong tin nhắn anh còn lỡ dùng những từ ngữ không phù hợp
                    với tuổi em.. Anh không biết chị em có đọc những tin nhắn đó hay không, nếu có thì chắc em sẽ bị
                    chửi nhiều lắm.
                  </p>
                  <p className="whitespace-pre-wrap my-4">
                    Anh không muốn nói lời xin lỗi ở đây đâu, anh muốn nói trực tiếp qua điện thoại cơ. Nhưng giờ anh
                    không tự tin để nhắn cho em, chứ đừng nói tới gọi. (Với cả, anh cũng bị em block hết rồi, chắc còn
                    đúng cái Locket là chưa)
                  </p>
                  <p className="whitespace-pre-wrap my-4">
                    Anh đã bỏ lỡ nhiều lần rồi. Lần này anh không muốn lại ngồi im một chỗ, chấp nhận sự thật và bước
                    qua đời nhau như hai người xa lạ. Anh không giỏi giao tiếp, Thứ mà anh giỏi nhất, thứ anh giỏi nhất
                    là code một trang web rồi viết những lời tâm sự lên đó. Anh hy vọng chúng ta có thể quay lại làm
                    bạn, như trước kia. Thỉnh thoảng, chỉ thỉnh thoảng thôi, nhắn tin hỏi thăm tình hình của nhau, chúc
                    ngủ ngon, động viên nhau. Không gọi điện, không nhắn tin lan man, không dùng từ ngữ vượt quá giới
                    hạn. Chỉ là những tin nhắn kute của một thanh niên 2k7 và một thiếu nữ 2k8 cùng động viên nhau tiến
                    lên.
                  </p>
                  <p className="whitespace-pre-wrap my-4">
                    Văn của của anh không có được trôi chảy cho lắm, anh chỉ biết diễn tả như thế này à. Anh không biết
                    em có đọc tin nhắn này không. Nếu có, thì phản hổi cho anh biết nhé. Dưới bài anh có thêm cái mục
                    bình luận á.
                  </p>
                  <p className="whitespace-pre-wrap my-4">
                    Hay là em gửi mail cho anh nha: <b className="text-link dark:text-link-dark">tienlx97@gmail.com</b>
                  </p>
                  <p className="whitespace-pre-wrap my-4">
                    Nếu không nhận được hồi âm, anh hiểu rằng áp lực em đang trải qua là rất rất lớn. Anh hoàn toàn tôn
                    trọng quyết định của em và sẽ không làm phiền thêm. Anh chỉ gửi tin nhắn tiếp theo vào dịp{' '}
                    <b>Tết Nguyên Đán</b> để chúc Tết, hoặc vào ngày <b>01/09/2026</b> như đã hứa. (Liệu lúc này em có
                    nhớ tới anh không ?)
                  </p>
                  <Link href="https://until-i-met-you.vercel.app/">https://until-i-met-you.vercel.app/</Link>
                </div>
              </div>

              <div className=" py-4 mx-auto max-w-4xl ms-0 2xl:mx-auto">
                <Giscus />
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
